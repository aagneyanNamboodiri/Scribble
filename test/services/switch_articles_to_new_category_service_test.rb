# frozen_string_literal: true

require "test_helper"

class SwitchArticlesToNewCategoryServiceTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @category_2 = create(:category, user: @user)
    @article = create(:article, user: @user, assigned_category: @category)
    @article_two = create(:article, user: @user, assigned_category: @category)
    @article_three = create(:article, user: @user, assigned_category: @category)
    @headers = headers()
  end

  def test_switches_articles_categories
    SwitchArticlesToNewCategoryService.new(
      [@article.id, @article_two.id, @article_three.id], @category_2.id, @user
    ).process
    [@article, @article_two, @article_three].each do |article|
      article.reload
      assert_equal @category_2.id, article.assigned_category_id
    end
  end

  def test_to_category_cannot_be_the_from_category
    assert_raises ArgumentError do
      SwitchArticlesToNewCategoryService.new(
        [@article.id, @article_two.id, @article_three.id], @category.id, @user
      ).process
    end
  end

  def test_to_category_needs_to_be_a_valid_category_id
    assert_raises ActiveRecord::RecordInvalid do
      SwitchArticlesToNewCategoryService.new(
        [@article.id, @article_two.id, @article_three.id], @category_2.id + "invalid-id", @user
      ).process
    end
  end

  def test_article_ids_passed_must_be_valid
    assert_raises ActiveRecord::RecordNotFound do
      SwitchArticlesToNewCategoryService.new(
        [@article.id + "invalid-id"], @category_2.id, @user
      ).process
    end
  end
end
