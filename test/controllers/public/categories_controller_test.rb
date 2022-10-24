# frozen_string_literal: true

require "test_helper"

class Public::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
    @user = build(:user)
    @article = create(:article, user: @user, assigned_category: @category)
    @organization = create(:organization, is_password: false)
    @headers = headers()
  end

  def test_should_index_all_categories
    get public_categories_path, headers: headers
    assert_response :success

    response_json = response.parsed_body
    all_categories = response_json["categories"]
    existing_categories_count = Category.count

    assert_equal all_categories.count, existing_categories_count
  end
end
