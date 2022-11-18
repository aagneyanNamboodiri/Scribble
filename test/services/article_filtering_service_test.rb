# frozen_string_literal: true

require "test_helper"

class ArticleFilteringServiceTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = build(:article, user: @user, assigned_category: @category)
    @headers = headers()
  end

  def test_list_all_articles_without_any_filters
    5.times do
      @article = create(:article, user: @user, assigned_category: @category)
    end
    all_articles = ArticleFilteringService.new([], "all", "", @user).process
    all_articles_count = @user.articles.count
    assert_equal all_articles.count, all_articles_count
  end

  def test_lists_articles_with_all_filters
    filter_category_one = create(:category, user: @user)
    filter_category_two = create(:category, user: @user)
    titled_article = create(
      :article, user: @user, assigned_category: @category, title: "Totally valid",
      status: "published")
    category_one_article = create(
      :article, user: @user, assigned_category: filter_category_one, title: "test",
      status: :published)
    category_two_article = create(
      :article, user: @user, assigned_category: filter_category_two,
      title: "Something else ")
    articles = ArticleFilteringService.new(
      [filter_category_one.name, filter_category_two.name], "published", "test", @user
    ).process

    search_filtered_articles = @user.articles.all.where("title like ?", "test")
    status_filtered_articles = search_filtered_articles.where("status like ?", "published")
    fully_filtered_articles = status_filtered_articles.select { |article|
      [filter_category_one.name, filter_category_two.name].include? article.assigned_category.name }
    assert_equal fully_filtered_articles.count, articles.count
  end

  def test_lists_only_article_with_search_term
    titled_article = create(:article, user: @user, assigned_category: @category, title: "test", status: "published")
    articles = ArticleFilteringService.new([], "all", "test", @user).process

    actual_articles = @user.articles.where("title like ?", "%test%")
    assert_equal actual_articles.count, articles.count
    assert_equal actual_articles[0].id, articles[0]["id"]
  end

  def test_lists_articles_with_a_category_filter
    filter_category_one = create(:category, user: @user)
    filter_category_two = create(:category, user: @user)
    category_one_article = create(:article, user: @user, assigned_category: filter_category_one)
    category_two_article = create(:article, user: @user, assigned_category: filter_category_two)
    articles = ArticleFilteringService.new([filter_category_one.name], "all", "", @user).process

    actual_articles = @user.articles.all.select { |article|
      [filter_category_one.name].include? article.assigned_category.name }

    assert_equal actual_articles.count, articles.count
    assert_equal actual_articles[0].id, articles[0]["id"]
  end

  def test_lists_only_article_with_provided_status
    published_article = create(:article, user: @user, assigned_category: @category, status: "published")
    drafted_article = create(:article, user: @user, assigned_category: @category, status: "draft")
    articles = ArticleFilteringService.new([], "draft", "", @user).process

    actual_articles = @user.articles.where("status like ?", "%draft%")

    assert_equal actual_articles.count, articles.count
  end
end
