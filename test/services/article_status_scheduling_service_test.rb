# frozen_string_literal: true

require "test_helper"

class ArticleStatusSchedulingServiceTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, user: @user, assigned_category: @category, status: "draft")
    @article_two = create(:article, user: @user, assigned_category: @category, status: "published")
    @current_time = Time.zone.now
  end

  def test_service_changes_status_of_article_and_schedule
    pending_schedule = build(
      :article_status_schedule, article: @article, article_status: "published",
      scheduled_time: @current_time - 120)
    pending_schedule_two = build(
      :article_status_schedule, article: @article_two, article_status: "draft",
      scheduled_time: @current_time - 60)
    pending_schedule.save(validate: false)
    pending_schedule_two.save(validate: false)
    ArticleStatusSchedulingService.new.process!
    @article.reload
    @article_two.reload
    assert_equal 0, ArticleStatusSchedule.where(schedule_status: :pending).count
    assert_equal "published", @article.status
    assert_equal "draft", @article_two.status
    assert_equal 2, ArticleStatusSchedule.where(schedule_status: :done).count
  end
end
