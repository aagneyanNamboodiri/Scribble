# frozen_string_literal: true

require "test_helper"

class ArticleSchedulesWorkerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, status: :draft, assigned_category: @category, user: @user)
    @article_two = create(:article, status: :published, assigned_category: @category, user: @user)
    @schedule = create(:article_status_schedule, article_status: :published, article: @article)
    @schedule_two = create(:article_status_schedule, article_status: :draft, article: @article_two)
    scheduled_date_and_time = "#{(@schedule.scheduled_time).strftime("%d/%m/%Y")}"
    travel_to DateTime.parse(scheduled_date_and_time) + 120
  end

  def test_worker_runs_all_pending_schedules
    ArticleStatusSchedulingWorker.perform_async
    @article.reload
    @article_two.reload
    @schedule.reload
    @schedule_two.reload

    assert_equal @schedule.article_status, @article.status
    assert_equal "done", @schedule.schedule_status
    assert_equal @schedule_two.article_status, @article_two.status
    assert_equal "done", @schedule_two.schedule_status
  end
end
