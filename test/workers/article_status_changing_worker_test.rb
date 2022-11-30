# frozen_string_literal: true

require "test_helper"

class ArticleStatusChangingWorkerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, status: :draft, assigned_category: @category, user: @user)
    @schedule = create(:article_status_schedule, article_status: :published, article: @article)
    scheduled_date_and_time = "#{(@schedule.scheduled_time).strftime("%d/%m/%Y")}"
    travel_to DateTime.parse(scheduled_date_and_time) + 120
  end

  def test_article_schedules_worker_updates_the_article_status_at_scheduled_date_and_time
    ArticleStatusChangingWorker.perform_async(@schedule.id)
    @article.reload
    @schedule.reload
    assert_equal @schedule.article_status, @article.status
    assert_equal "done", @schedule.schedule_status
  end
end
