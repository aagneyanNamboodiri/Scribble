# frozen_string_literal: true

require "test_helper"

class ArticlesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, user: @user, assigned_category: @category)
    @headers = headers()
    end

  def test_list_all_articles_without_any_filters
    5.times do
      @article = create(:article, user: @user, assigned_category: @category)
    end
    get api_articles_path, params: {}, headers: headers
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
    filter_category_one = create(:category, user: @user)
    filter_category_two = create(:category, user: @user)
    titled_article = create(:article, user: @user, assigned_category: @category, title: "test", status: "published")
    category_one_article = create(:article, user: @user, assigned_category: filter_category_one)
    category_two_article = create(:article, user: @user, assigned_category: filter_category_two)
    get api_articles_path, params: {
      search_query: "test",
      article_status: "published",
      selected_category_fiter: [filter_category_one.name, filter_category_two.name]
    }, headers: headers
    response_json = response.parsed_body
    response_articles = response_json["articles"]

    search_filtered_articles = Article.all.where("title like ?", "%test%")
    status_filtered_articles = search_filtered_articles.where("status like ?", "%published%")
    fully_filtered_articles = status_filtered_articles.select { |article|
      [filter_category_one.name, filter_category_two.name].include? article.assigned_category.name }

    assert_equal fully_filtered_articles.count, response_articles.count
  end

  def test_lists_only_article_with_search_term
    titled_article = create(:article, user: @user, assigned_category: @category, title: "test", status: "published")
    get api_articles_path, params: { search_query: "test" }, headers: headers
    assert_response :success

    response_json = response.parsed_body
    response_articles = response_json["articles"]
    actual_articles = Article.where("title like ?", "%test%")

    assert_equal actual_articles.count, response_articles.count
    assert_equal actual_articles[0].id, response_articles[0]["id"]
  end

  def test_lists_articles_with_a_category_filter
    filter_category_one = create(:category, user: @user)
    filter_category_two = create(:category, user: @user)
    category_one_article = create(:article, user: @user, assigned_category: filter_category_one)
    category_two_article = create(:article, user: @user, assigned_category: filter_category_two)
    get api_articles_path, params: { selected_category_fiter: [filter_category_one.name] },
      headers: headers
    assert_response :success

    response_json = response.parsed_body
    response_articles = response_json["articles"]
    actual_articles = Article.all.select { |article|
      [filter_category_one.name].include? article.assigned_category.name }

    assert_equal actual_articles.count, response_articles.count
    assert_equal actual_articles[0].id, response_articles[0]["id"]
  end

  def test_lists_only_article_with_provided_status
    published_article = create(:article, user: @user, assigned_category: @category, status: "published")
    drafted_article = create(:article, user: @user, assigned_category: @category, status: "draft")
    get api_articles_path, params: { article_status: "draft" }, headers: headers
    assert_response :success

    response_json = response.parsed_body
    response_articles = response_json["articles"]
    actual_articles = @user.articles.where("status like ?", "%draft%")

    assert_equal actual_articles.count, response_articles.count
  end

  def test_should_be_able_to_create_a_valid_article_with_params
    post api_articles_path,
      params: {
        article: {
          title: "New Title", body: "New body", status: "published", assigned_category_id: @category.id
        }
      },
      headers: headers

    assert_response :success
    response_json = response.parsed_body

    assert_equal t("successfully_created", entity: "Article"), response_json["notice"]
  end

  def test_should_destroy_article
    delete api_article_path(@article.id), headers: headers
    assert_response :ok

    response_json = response.parsed_body
    assert_equal t("successfully_destroyed", entity: "Article"), response_json["notice"]
  end

  def test_should_give_article_not_found_for_invalid_article_id
    invalid_id = @article.id + "extra-string"
    get api_article_path(invalid_id), headers: headers

    assert_response :not_found
    response_json = response.parsed_body
    assert_includes response_json["error"], "Couldn't find Article with 'id'=#{invalid_id}"
  end

  def test_article_should_get_updated_successfully
    new_title = "#{@article.title}-(updated)"
    article_params = {
      article: {
        title: new_title, assigned_category_id: @category.id, body: "New Body",
        status: "published"
      }
    }
    put api_article_path(@article.id), params: article_params, headers: headers

    assert_response :success
    @article.reload
    assert_equal new_title, @article.title
    assert_equal @category.id, @article.assigned_category_id
    assert_equal "published", @article.status
  end

  def test_should_show_the_correct_article
    get api_article_path(@article.id), headers: headers

    assert_response :ok
    response_json = response.parsed_body
    assert_equal @article.id, response_json["id"]
  end
end
