# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
    @category_2 = create(:category)
    @user = create(:user)
    @article = create(:article, user: @user, assigned_category: @category)
    @headers = headers()
  end

  def test_listing_all_categories
    get categories_path, headers: headers
    assert_response :success

    response_json = response.parsed_body
    all_categories = response_json["categories"]
    existing_categories_count = Category.count

    assert_equal all_categories.count, existing_categories_count
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
    delete category_path(@category_2.id.to_i), headers: headers
    response_json = response.parsed_body
    assert_response :success
  end

  def test_should_switch_article_category_to_new_category_when_deleting
    @article.assigned_category = @category
    @article.save!
    delete category_path(@category.id.to_i),
      params: {
        new_category: @category_2.id.to_i
      },
      headers: headers
    assert_response :success
  end

  def test_should_updated_category_name
    @category.save!
    put category_path(@category.id.to_i), params: {
                                            category:
                                                  { name: "Death by chocolate" }
                                          },
      headers: headers
    assert_response :ok
  end

  def test_shouldnt_create_category_without_name
    post categories_path, params: { category: { name: "" } }, headers: headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Name can't be blank"
  end

  def test_category_reorder
    @category.position = 1
    @category_2.position = 2
    @category.save!
    @category_2.save!
    put reorder_category_path(@category_2.id.to_i), params: { reorder: { reorder_positions: "-2" } }, headers: headers
    response_json = response.parsed_body
    assert_response :no_content
  end
end
