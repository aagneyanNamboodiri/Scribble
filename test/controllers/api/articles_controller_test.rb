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

  def test_lists_articles
    5.times do
      @article = create(:article, user: @user, assigned_category: @category)
    end

    get api_articles_path, params: {}, headers: headers
    assert_response :success

    articles = response_to_json(response)["articles"]
    assert_equal @user.articles.count, articles.count
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

    assert_equal t("successfully_created", entity: "Article"), response_to_json(response)["notice"]
  end

  def test_should_destroy_article
    delete api_article_path(@article.id), headers: headers
    assert_response :ok

    assert_equal t("successfully_destroyed", entity: "Article"), response_to_json(response)["notice"]
  end

  def test_should_give_article_not_found_for_invalid_article_id
    invalid_id = @article.id + "extra-string"
    get api_article_path(invalid_id), headers: headers

    assert_response :not_found

    assert_includes response_to_json(response)["error"], "Couldn't find Article with 'id'=#{invalid_id}"
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

    assert_equal @article.id, response_to_json(response)["article"]["id"]
  end

  def test_should_reorder_articles
    @article_two = create(:article, user: @user, assigned_category: @category, position: 2)
    @article.position = 1
    @article.save!
    put reorder_api_article_path(@article_two.id), params: { position: 1 }, headers: headers
    assert_response :no_content

    @article_two.reload
    assert_equal 1, @article_two.position
  end

  def test_lists_articles_belonging_to_a_category
    article_two = create(:article, user: @user, assigned_category: @category, position: 2)
    category_two = create(:category, user: @user)
    article_three = create(:article, user: @user, assigned_category: category_two, position: 2)

    get articles_of_category_api_article_path(@category.id), headers: headers
    assert_response :success

    assert_equal 2, response_to_json(response)["articles"].length
    assert_equal @article.id, response_to_json(response)["articles"][0]["id"]
  end

  def test_changes_categories_of_multiple_articles
    article_two = create(:article, user: @user, assigned_category: @category)
    article_three = create(:article, user: @user, assigned_category: @category)
    category_two = create(:category, user: @user)
    put bulk_articles_category_update_api_articles_path,
      params: { article_ids: [@article.id, article_two.id, article_three.id], to_category: category_two.id },
      headers: headers
    assert_response :success
    @article.reload
    article_two.reload
    article_three.reload
    assert_equal category_two.id, @article.assigned_category_id
    assert_equal category_two.id, article_two.assigned_category_id
    assert_equal category_two.id, article_three.assigned_category_id
  end
end
