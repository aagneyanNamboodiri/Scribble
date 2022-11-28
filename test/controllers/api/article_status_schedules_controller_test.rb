# frozen_string_literal: true

require "test_helper"

class Api::ArticleStatusSchedulesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, user: @user, assigned_category: @category, status: "draft")
    @article_two = create(:article, user: @user, assigned_category: @category, status: "published")
    @headers = headers()
    @current_time = Time.zone.now() + 60
  end

  def test_indexes_all_schedules_of_specified_article_only
    completed_schedule = create(
      :article_status_schedule, article: @article, article_status: "published",
      schedule_status: "done", scheduled_time: @current_time - 100)
    another_article_schedule = create(
      :article_status_schedule, article: @article_two, article_status: "published",
      schedule_status: "pending", scheduled_time: @current_time)
    pending_schedule_one = create(
      :article_status_schedule, article: @article, article_status: "published",
      schedule_status: "pending", scheduled_time: @current_time)
    pending_schedule_two = create(
      :article_status_schedule, article: @article, article_status: "draft",
      schedule_status: "pending", scheduled_time: @current_time + 10)
    get api_article_status_schedules_path, params: { article_id: @article.id },
      headers: headers
    assert_response :success

    fetched_pending_schedules = response_to_json(response)["schedules"]["pending_schedules"].count
    fetched_completed_schedules = response_to_json(response)["schedules"]["completed_schedules"].count
    pending_schedules = @article.article_status_schedules.where(schedule_status: :pending).count
    completed_schedules = @article.article_status_schedules.where(schedule_status: :done).count
    assert_equal pending_schedules, fetched_pending_schedules
    assert_equal completed_schedules, fetched_completed_schedules
  end

  def test_creates_schedule_with_valid_parameters
    schedule_params = { scheduled_time: @current_time, article_status: "draft" }
    post api_article_status_schedules_path, params: {
      article_id: @article.id, schedule: schedule_params
    }, headers: headers

    assert_response :success
    assert_equal "Article successfully scheduled to draft", response_to_json(response)["notice"]
  end

  def test_deletes_schedule_with_valid_parameters
    article_schedule = create(
      :article_status_schedule, article: @article, article_status: "published",
      schedule_status: "pending", scheduled_time: @current_time)
    assert_difference "@article.article_status_schedules.count", -1 do
      delete api_article_status_schedule_path(article_schedule.id), headers: headers
    end
    assert_response :success
    assert_equal "The schedule has been deleted", response_to_json(response)["notice"]
  end
end
