# frozen_string_literal: true

require "test_helper"

class SwitchArticlesToNewCategoryServiceTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
    @category_2 = create(:category)
    @user = create(:user)
    @article = build(:article, user: @user, assigned_category: @category)
    @headers = headers()
  end

  def test_shouldnt_delete_category_if_it_has_article_assigned_to_it
    some_category = build(:category)
    @article.assigned_category = some_category
    @article.save!
    assert_raises NoMethodError do
      delete category_path(@some_category.id.to_i), headers: headers
    end
  end

  def test_should_delete_category_if_it_has_no_articles_under_it
    @category_2.save!
    delete category_path(@category_2.id), headers: headers
    response_json = response.parsed_body

    assert_response :success
    assert_equal t("successfully_destroyed", entity: "Category"), response_json["notice"]
  end

  def test_should_switch_article_category_to_new_category_when_deleting
    @article.save!
    delete category_path(@category.id),
      params: {
        new_category: @category_2.id
      },
      headers: headers

    assert_response :success
    @article.reload
    assert_equal @category_2.id, @article.assigned_category_id
  end

  def test_should_create_general_category_when_deleting_last_category
    delete category_path(@category_2.id), headers: headers
    assert_response :success

    @article.save!
    delete category_path(@category.id), headers: headers

    assert_response :success
    assert_equal 1, Category.all.count
    assert_equal "General", Category.first.name
  end
end
