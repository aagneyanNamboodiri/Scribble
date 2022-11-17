# frozen_string_literal: true

require "test_helper"

class Api::AnalyticsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, user: @user, assigned_category: @category, status: :published)
    @headers = headers()
  end

  def test_lists_all_published_articles
    article2 = create(:article, user: @user, assigned_category: @category, status: :published)
    article3 = create(:article, user: @user, assigned_category: @category, status: :draft)

    get api_analytics_path, headers: headers

    assert_response :success
    all_articles = response_to_json(response)["articles"]
    assert_equal @user.articles.where(status: :published).count, all_articles.count
  end

  def test_shows_visits_count_of_article
    slug_to_get = @article.slug

    post api_login_path, params: { password: "admin1" },
      headers: headers
    get public_article_path(slug_to_get), headers: headers
    assert_response :success

    get public_article_path(slug_to_get), headers: headers
    assert_response :success

    get public_article_path(slug_to_get), headers: headers
    assert_response :success

    get api_analytic_path(@article.id), headers: headers
    assert_response :success
    visit_count = response_to_json(response)["visit_count"]
    assert_equal @article.article_visits.count, visit_count[Time.zone.now.strftime("%Y-%m-%d")]
  end
end
