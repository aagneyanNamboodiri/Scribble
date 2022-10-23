# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @user = create(:user)
    @category = create(:category)
    @filter_category_one = create(:category)
    @filter_category_two = create(:category)
    @article = create(:article, user: @user, assigned_category: @category)
    @published_article = create(:article, user: @user, assigned_category: @category, status: "published")
    @drafted_article = create(:article, user: @user, assigned_category: @category, status: "draft")
    @category_one_article = create(:article, user: @user, assigned_category: @filter_category_one)
    @category_two_article = create(:article, user: @user, assigned_category: @filter_category_two)
    @titled_article = create(:article, user: @user, assigned_category: @category, title: "test")
    @headers = headers()
    end

  def test_list_all_articles_without_any_filters
    get articles_path, params: {}, headers: headers
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

  def test_lists_articles_with_all_filters
    get articles_path, params: {
      search_query: "test",
      article_status: "published",
      categories_to_filter_with:
                                  [@filter_category_one.name, @filter_category_two.name]
    }, headers: headers
    response_json = response.parsed_body
    response_articles = response_json["articles"]

    search_filtered_articles = Article.all.where("title like ?", "%test%")
    status_filtered_articles = search_filtered_articles.where("status like ?", "%published%")
    fully_filtered_articles = status_filtered_articles.select { |article|
      [@filter_category_one.name, @filter_category_two.name].include? article.assigned_category.name }

    assert_equal fully_filtered_articles.count, response_articles.count
  end

  def test_lists_only_article_with_search_term
    get articles_path, params: { search_query: "test" }, headers: headers
    assert_response :success

    response_json = response.parsed_body
    response_articles = response_json["articles"]
    actual_articles = Article.where("title like ?", "%test%")

    assert_equal actual_articles.count, response_articles.count
    assert_equal actual_articles[0].id, response_articles[0]["id"]
  end

  def test_lists_articles_with_a_category_filter
    get articles_path, params: { selected_category_fiter: [@filter_category_one.name] },
      headers: headers
    assert_response :success

    response_json = response.parsed_body
    response_articles = response_json["articles"]
    actual_articles = Article.all.select { |article|
      [@filter_category_one.name].include? article.assigned_category.name }

    assert_equal actual_articles.count, response_articles.count
    assert_equal actual_articles[0].id, response_articles[0]["id"]
  end

  def test_lists_only_article_with_provided_status
    get articles_path, params: { article_status: "draft" }, headers: headers
    assert_response :success

    response_json = response.parsed_body
    response_articles = response_json["articles"]
    actual_articles = Article.where("status like ?", "%draft%")

    assert_equal actual_articles.count, response_articles.count
    assert_equal actual_articles[0].id, response_articles[0]["id"]
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

  def test_should_destroy_article
    delete article_path(@article.id), headers: headers
    assert_response :ok
  end

  def test_should_give_article_not_found_for_invalid_article_id
    invalid_id = @article.id + "extra-string"
    get article_path(invalid_id), headers: headers

    assert_response :not_found
    response_json = response.parsed_body
    assert_equal "Couldn't find Article with 'id'=#{invalid_id}", response_json["error"]
  end

  def test_article_should_get_updated_successfully
    new_title = "#{@article.title}-(updated)"
    article_params = { article: { title: new_title, assigned_category_id: @category.id, body: "New Body" } }
    put article_path(@article.id), params: article_params, headers: headers

    assert_response :success
    @article.reload
    assert_equal @article.title, new_title
    assert_equal @article.assigned_category_id, @category.id
  end

  def test_should_show_the_correct_article
    get articles_path, params: { id: @article.id }, headers: headers

    assert_response :ok
    response_json = response.parsed_body
    assert_equal Article.find(@article.id).id, response_json["articles"][0]["id"]
  end
end
