# frozen_string_literal: true

require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @category_2 = create(:category, user: @user)
    @article = build(:article, user: @user, assigned_category: @category)
    @headers = headers()
  end

  def test_listing_all_categories
    get api_categories_path, headers: headers
    assert_response :success

    response_json = response.parsed_body
    all_categories = response_json["categories"]
    existing_categories_count = @user.categories.count

    assert_equal existing_categories_count, all_categories.count
  end

  def test_should_create_valid_category
    post api_categories_path, params: {
      category: {
        name: "random category"
      }
    }, headers: headers

    assert_response :success
    response_json = response.parsed_body
    assert_equal t("successfully_created", entity: "Category"), response_json["notice"]
  end

  def test_should_delete_category_if_it_has_no_articles_under_it
    @category_2.save!
    delete api_category_path(@category_2.id), headers: headers
    response_json = response.parsed_body

    assert_response :success
    assert_equal t("successfully_destroyed", entity: "Category"), response_json["notice"]
  end

  def test_should_switch_article_category_to_new_category_when_deleting
    @article.save!
    delete api_category_path(@category.id),
      params: {
        new_category: @category_2.id
      },
      headers: headers

    assert_response :success
    @article.reload
    assert_equal @category_2.id, @article.assigned_category_id
  end

  def test_should_create_general_category_when_deleting_last_category
    delete api_category_path(@category_2.id), headers: headers
    assert_response :success
    assert_equal 1, @user.categories.count

    @article.save!
    delete api_category_path(@category.id), headers: headers

    assert_response :success
    assert_equal 1, @user.categories.count
    assert_equal "General", @user.categories.first.name
  end

  def test_should_updated_category_name
    @category.save!
    put api_category_path(@category.id), params: {
                                           category:
                                                 { name: "Chocolate" }
                                         },
      headers: headers
    @category.reload

    assert_response :ok
    assert_equal "Chocolate", @category.name
  end

  def test_category_reorder
    @category.position = 1
    @category_2.position = 2
    @category.save!
    @category_2.save!
    put reorder_api_category_path(@category_2.id), params: { reorder: { positions: 2 } }, headers: headers
    @category.reload
    @category_2.reload
    assert_equal 1, @category_2.position
    assert_equal 2, @category.position
  end
end
