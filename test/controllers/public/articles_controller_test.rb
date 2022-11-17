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
    get public_articles_path, params: { search_term: "" }, headers: headers
    assert_response :success

    all_articles = response_to_json(response)["articles"]
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

    article_title = response_to_json(response)["title"]
    assert_equal @article.title, article_title
  end

  def test_unauthorized_users_cant_view_articles
    get public_articles_path, headers: headers
    assert_response :unauthorized

    assert_equal t("not_authorized"), response_to_json(response)["error"]
  end

  def test_showing_article_increments_visits
    slug_to_get = @article.slug
    post api_login_path, params: { password: "admin1" },
      headers: headers
    assert_difference "@article.article_visits.count", 1 do
      get public_article_path(slug_to_get), headers: headers
    end
  end

  def test_unauthorized_user_doesnt_increment_visits
    slug_to_get = @article.slug
    visits_previously = @article.article_visits.count
    get public_article_path(slug_to_get), headers: headers
    assert_response :unauthorized

    @article.reload
    assert_equal visits_previously, @article.article_visits.count
  end

  def test_lists_articles_when_searched
    @article_two = create(:article, user: @user, assigned_category: @category, status: "published")
    title_to_search = @article.title
    post api_login_path, params: { password: "admin1" },
      headers: headers
    get public_articles_path, params: { search_term: title_to_search }, headers: headers
    assert_response :success

    articles_with_search = @user.articles.where(
      "title like ?",
      title_to_search)

    assert_equal response_to_json(response)["articles"].count, articles_with_search.count
    assert_equal response_to_json(response)["articles"].first["id"], articles_with_search.first.id
  end

  def test_invalid_slug_gives_error_message
    @article.save!
    slug_to_get = @article.slug + "extra string"
    post api_login_path, params: { password: "admin1" },
      headers: headers
    get public_article_path(slug_to_get), headers: headers
    assert_response :unprocessable_entity

    assert_equal t("doesnt_exist", entity: "Article"), response_to_json(response)["error"]
  end
end
