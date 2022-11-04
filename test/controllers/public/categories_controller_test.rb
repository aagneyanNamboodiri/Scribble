# frozen_string_literal: true

require "test_helper"

class Public::CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @category_two = create(:category, user: @user)
    @article = create(:article, user: @user, assigned_category: @category, status: "published")
    @headers = headers()
  end

  def test_unauthorized_user_cannot_see_categories
    get public_categories_path, headers: headers
    assert_response :unauthorized

    response_json = response.parsed_body
    assert_equal t("not_authorized"), response_json["error"]
  end

  def test_authorized_user_can_access_categories_with_atleast_one_published_article
    post api_login_path, params: { password: "admin1" }, headers: headers
    get public_categories_path, headers: headers
    assert_response :success

    response_json = response.parsed_body
    all_categories = @user.categories.order(position: :asc)
    categories_with_published_articles = all_categories.select { |category| category.articles.published.count > 0 }
    assert_equal categories_with_published_articles.count, response_json["categories"].count
  end

  def test_only_categories_with_published_articles_are_shown_to_authorized_user
    @article.status = "draft"
    @article.save!
    post api_login_path, params: { password: "admin1" }, headers: headers
    get public_categories_path, headers: headers
    assert_response :success
    response_json = response.parsed_body
    all_categories = @user.categories.order(position: :asc)
    categories_with_published_articles = all_categories.select { |category| category.articles.published.count > 0 }
    assert_equal categories_with_published_articles.count, response_json["categories"].count
    assert_equal 0, response_json["categories"].count
  end
end
