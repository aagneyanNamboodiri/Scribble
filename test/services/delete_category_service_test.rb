# frozen_string_literal: true

require "test_helper"

class DeleteCategoryServiceTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @category_2 = create(:category, user: @user)
    @article = build(:article, user: @user, assigned_category: @category)
    @headers = headers()
  end

  def test_should_delete_category_if_it_has_no_articles_under_it
    assert_difference "Category.count", -1 do
      DeleteCategoryService.new(@category_2.id, "", @user).process
    end
  end

  def test_should_switch_article_category_to_new_category_when_deleting
    @article.save!
    assert_difference "Category.count", -1 do
      DeleteCategoryService.new(@category.id, @category_2.id, @user).process
    end

    @article.reload
    assert_equal @category_2.id, @article.assigned_category_id
  end

  def test_should_create_general_category_when_deleting_last_category
    @category_2.destroy!
    @article.save!
    DeleteCategoryService.new(@category.id, "", @user).process

    assert_equal 1, @user.categories.all.count
    assert_equal "General", @user.categories.first.name
  end

  def test_from_category_and_to_category_cannot_be_same
    @article.save!
    assert_raises ArgumentError do
      DeleteCategoryService.new(@category.id, @category.id, @user).process
    end
  end

  def test_from_category_has_to_be_a_valid_category
    assert_raises ActiveRecord::RecordNotFound do
      DeleteCategoryService.new("test", @category_2.id, @user).process
    end
  end

  def test_to_category_has_to_be_a_valid_category
    @article.save!
    assert_raises ActiveRecord::RecordInvalid do
      DeleteCategoryService.new(@category.id, "test", @user).process
    end
  end

  def test_shouldnt_delete_if_general_category_is_only_existing_category
    @category_2.destroy!
    @category.update!(name: "General")
    assert_raises RuntimeError do
      DeleteCategoryService.new(@category.id, "", @user).process
    end
  end
end
