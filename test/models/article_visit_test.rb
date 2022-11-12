# frozen_string_literal: true

require "test_helper"

class ArticleVisitTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = build(:article, assigned_category: @category, user: @user, status: "published")
  end

  def test_deleting_article_cascade_deletes_visits
    @article.save!
    @article.article_visits.create!(visit_date: Time.zone.now.to_date)
    @article.destroy!
    assert_equal 0, ArticleVisit.count
  end
end
