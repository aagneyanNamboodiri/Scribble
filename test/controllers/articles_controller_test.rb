# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category)
    @user = create(:user)
    @article = create(:article, user: @user, assigned_category: @category)
    @headers = headers()
    end

  def test_list_all_articles
    get articles_path, headers: headers
    assert_response :success

    response_json = response.parsed_body
    all_articles = response_json["articles"]
    published_articles_count = Article.where(status: "published").count
    draft_articles_count = Article.where(status: "draft").count
    all_articles_count = Article.count

    assert_equal all_articles.count, all_articles_count
    assert_equal published_articles_count, Article.where(status: :published).count
    assert_equal draft_articles_count, Article.where(status: :draft).count
  end

  def test_should_create_a_valid_article
    post articles_path,
      params: {
        article: {
          title: "New Title", body: "New body", status: "published", assigned_category_id: @category.id
        }
      },
      headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal response_json["notice"], t("successfully_created", entity: "Article")
  end

  def test_shouldnt_create_article_without_title
    post articles_path, params: { article: { title: "", assigned_category_id: @category.id } },
      headers: headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Title can't be blank and Body can't be blank"
  end

  def test_shouldnt_create_article_without_body
    post articles_path, params: { article: { title: "Hehe boi", assigned_category_id: @category.id, body: "" } },
      headers: headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Body can't be blank"
  end

  def test_should_destroy_article
    delete article_path(@article.slug), headers: headers
    assert_response :ok
  end

  def test_should_give_article_not_found_for_invalid_article_slug
    invalid_slug = "invalid-slug"

    get article_path(invalid_slug), headers: headers

    assert_response :not_found
    response_json = response.parsed_body
    assert_equal response_json["error"], "Couldn't find Article"
  end

  def test_article_should_get_updated_successfully
    new_title = "#{@article.title}-(updated)"
    article_params = { article: { title: new_title, assigned_category_id: @category.id, body: "New Body" } }

    put article_path(@article.slug), params: article_params, headers: headers
    assert_response :success
    @article.reload
    assert_equal @article.title, new_title
    assert_equal @article.assigned_category_id, @category.id
  end

  def test_shouldnt_create_article_without_valid_category
    post articles_path,
      params: {
        article: {
          title: "New Title", body: "New body", status: "published", assigned_category_id: "theres_no_way_this_is_an_id"
        }
      },
      headers: headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_equal response_json["error"], "Assigned category must exist"
  end
end
