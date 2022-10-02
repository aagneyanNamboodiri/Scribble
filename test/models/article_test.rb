# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @category = create(:category)
    @article = create(:article)
  end

  def test_article_should_not_be_valid_and_saved_without_title
    @article.title = ""
    assert_not @article.valid?
    assert_includes @article.errors.full_messages, "Title can't be blank"
  end

  def test_slug_is_parameterised_title
    title = @article.title
    @article.save!
    assert_equal title.parameterize, @article.slug
  end

  def test_slug_should_be_incremented
    article_one = Article.create!(
      title: "test article", body: "haha body", assigned_category: @category,
      user_id: @user.id)
    article_two = Article.create!(
      title: "test article", body: "haha body", assigned_category: @category,
      user_id: @user.id)
    assert_equal "test-article", article_one.slug
    assert_equal "test-article-2", article_two.slug
  end

  def test_duplicate_slug_raises_error
    test_article = Article.create!(
      title: "test article", body: "haha body", assigned_category: @category,
      user_id: @user.id)
    @article.save!
    assert_raises ActiveRecord::RecordInvalid do
      test_article.update!(slug: @article.slug)
    end
  end

  def test_updating_title_doesnt_change_slug
    before_slug = @article.slug
    @article.title = "Changed title"
    @article.save!
    assert_equal before_slug, @article.slug
  end
end
