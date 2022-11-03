# frozen_string_literal: true

require "test_helper"

class Api::ArticleVersionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, user: @user, assigned_category: @category)
    @headers = headers()
  end

  def update_articles_for_creating_versions
    article_params = {
      article: {
        title: "Test title", assigned_category_id: @category.id, body: "New Body",
        status: "published"
      }
    }
    put api_article_path(@article.id), params: article_params, headers: headers
    assert_response :success

    article_params = {
      article: {
        title: "Title tested again", assigned_category_id: @category.id, body: "New Body",
        status: "published"
      }
    }
    put api_article_path(@article.id), params: article_params, headers: headers
    assert_response :success

    article_params = {
      article: {
        title: "Tested title 3", assigned_category_id: @category.id, body: "New Body",
        status: "published"
      }
    }
    put api_article_path(@article.id), params: article_params, headers: headers
    assert_response :success
  end

  def test_updating_article_creates_paper_trail_entries
    assert_difference "@article.versions.count", 3 do
      update_articles_for_creating_versions
    end
  end

  def test_all_versions_are_listed_when_article_updated
    update_articles_for_creating_versions
    @article.reload
    get api_article_article_versions_path(@article.id), headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal @article.versions.count, response_json["versions"].length + 1
  end

  def test_gets_versioned_article
    update_articles_for_creating_versions
    @article.reload
    versioned_article = @article.versions[1].reify
    versioned_article_id = @article.versions[1].id
    get api_article_article_version_path(@article.id, versioned_article_id), headers: headers
    assert_response :success
    response_json = response.parsed_body
    assert_equal versioned_article.title, response_json["title"]
  end
end
