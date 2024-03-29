# frozen_string_literal: true

require "test_helper"

class ArticleTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = build(:article, assigned_category: @category, user: @user, status: "published")
  end

  def test_article_should_not_be_valid_and_saved_without_title
    @article.title = ""
    assert_not @article.valid?
    assert_includes "Title can't be blank", @article.errors.full_messages[0]
  end

  def test_title_should_have_atleast_one_alphanumeric
    @article.title = "-/|"
    assert_not @article.valid?
    assert_includes "Title is invalid", @article.errors.full_messages[0]
  end

  def test_article_should_not_be_valid_and_saved_without_body
    @article.body = ""
    assert_not @article.valid?
    assert_includes "Body can't be blank", @article.errors.full_messages[0]
  end

  def test_article_should_have_a_valid_category_associated
    @article.assigned_category_id = "an-invalid-id"
    assert_not @article.valid?
    assert_includes "Assigned category must exist", @article.errors.full_messages[0]
  end

  def test_slug_is_parameterised_title
    title = @article.title
    @article.save!
    assert_equal title.parameterize, @article.slug
  end

  def test_slug_should_be_incremented
    article_two = build(:article, assigned_category: @category, user: @user, title: @article.title, status: "published")
    @article.save!
    article_two.save!
    first_article_slug = @article.slug
    incremented_slug = first_article_slug + "-2"
    assert_equal first_article_slug, @article.slug
    assert_equal incremented_slug, article_two.slug
  end

  def test_duplicate_slug_raises_error
    test_article = create(:article, assigned_category: @category, user: @user)
    @article.save!
    assert_raises ActiveRecord::RecordInvalid do
      test_article.update!(slug: @article.slug)
    end
  end

  def test_updating_title_doesnt_change_slug
    @article.save!
    before_slug = @article.slug
    @article.title = "Changed title"
    @article.save!
    assert_equal before_slug, @article.slug
  end

  def test_article_status_has_to_be_either_draft_or_published
    assert_raises ArgumentError do
      @article.status = "neither"
    end
  end

  def test_slug_should_be_nil_before_initial_publish
    draft_article = build(:article, assigned_category: @category, user: @user, status: "draft")
    draft_article.save!
    assert_nil draft_article.slug
  end

  def test_slug_at_first_publish_should_never_change_upon_republishing
    @article = build(:article, assigned_category: @category, user: @user, status: "published")
    @article.save!
    first_slug = @article.slug
    @article.status = "draft"
    @article.save!

    assert_equal first_slug, @article.slug

    @article.status = "published"
    @article.save!

    assert_equal first_slug, @article.slug
  end
end
