# frozen_string_literal: true

require "test_helper"

class Public::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, user: @user, assigned_category: @category, status: "published")
    @drafted_article = create(:article, user: @user, assigned_category: @category, status: "draft")
    @headers = headers()
  end

  def test_list_only_published_articles
    post api_login_path, params: { password: "admin1" },
      headers: headers
    get public_articles_path, headers: headers
    assert_response :success

    response_json = response.parsed_body
    all_articles = response_json["articles"]
    published_articles_count = @user.articles.where(status: "published").count

    assert_equal published_articles_count, all_articles.count
  end

  def test_lists_correct_articles
    @article.save!
    slug_to_get = @article.slug
    post api_login_path, params: { password: "admin1" },
      headers: headers
    get public_article_path(slug_to_get), headers: headers
    assert_response :success

    response_json = response.parsed_body
    article_title = response_json["title"]
    assert_equal @article.title, article_title
  end

  def test_unauthorized_users_cant_view_articles
    get public_articles_path, headers: headers
    assert_response :unauthorized

    response_json = response.parsed_body
    assert_equal "Not authorized", response_json["error"]
  end
end
