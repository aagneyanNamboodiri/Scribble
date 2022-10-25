# frozen_string_literal: true

require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = build(:category, user: @user)
    @article = build(:article, assigned_category: @category, user: @user)
  end

  def test_cant_delete_category_if_it_has_an_associated_article
    @article.save!
    assert_raises ActiveRecord::InvalidForeignKey do
      @category.delete
    end
  end

  def test_category_should_not_be_valid_and_saved_without_category_name
    @category.name = ""
    assert_not @category.valid?
    assert_includes "Category can't be blank", @category.errors.full_messages[0]
  end

  def test_category_name_should_have_atleast_one_alphanumeric
    @category.name = ">_<"
    assert_not @category.valid?
    assert_includes "Category is invalid", @category.errors.full_messages[0]
  end

  def test_category_name_should_be_of_valid_length
    @category.name = "a" * (Category::MAX_CATEGORY_LENGTH + 1)
    assert_not @category.valid?
    assert_includes "Category is too long (maximum is 25 characters)", @category.errors.full_messages[0]
  end

  def test_category_can_have_zero_articles_count
    @category.articles_count = 0
    assert @category.valid?
  end

  def test_category_name_should_be_unique
    @category.save!
    @category_two = build(:category, name: @category.name)
    assert_not @category_two.valid?
    assert_includes "Category already exists", @category_two.errors.full_messages[0]
  end

  def test_category_position_on_creation_should_be_last
    @category.save!
    @category_two = build(:category)
    @category_two.save!
    assert Category.all.count, @category_two.position
  end
end
