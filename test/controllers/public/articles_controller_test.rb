# frozen_string_literal: true

require "test_helper"

class Public::ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = build(:user)
    @article = create(:article)
    @preference = create(:preference, is_password: false)
    @headers = headers()
  end

  def test_list_all_articles
    get public_articles_path, headers: headers
    assert_response :success

    response_json = response.parsed_body
    all_articles = response_json["articles"]
    published_articles_count = Article.where(status: "published").count

    assert_equal published_articles_count, Article.where(status: :published).count
  end

  def test_lists_correct_article
    @article.save!
    slug_to_get = @article.slug
    get public_article_path(slug_to_get), headers: headers
    assert_response :success

    response_json = response.parsed_body
    article_title = response_json["title"]
    assert_equal @article.title, article_title
  end
end
