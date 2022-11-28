# frozen_string_literal: true

require "test_helper"

class DeleteScheduleServiceTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @category_2 = create(:category, user: @user)
    @article = create(:article, user: @user, assigned_category: @category, status: "published")
    @pending_schedule = build(
      :article_status_schedule, article: @article, article_status: "draft")
    @time = Time.zone.now + 120
  end

  def test_deletes_one_schedule_if_exists
    @pending_schedule.save!
    assert_difference "@article.article_status_schedules.count", -1 do
      DeleteScheduleService.new(@pending_schedule.id).process!
    end
  end

  def test_deleting_schedule_removes_next_schedule_with_it_to_prevent_duplicate_status_update
    @pending_schedule.save!
    pending_schedule_two = create(
      :article_status_schedule, article: @article, article_status: "published", scheduled_time: @time)
    pending_schedule_three = create(
      :article_status_schedule, article: @article, article_status: "draft", scheduled_time: @time + 60)
    assert_difference "@article.article_status_schedules.count", -2 do
      DeleteScheduleService.new(@pending_schedule.id).process!
    end
    @article.reload
    assert_equal @article.article_status_schedules.first.id, pending_schedule_three.id
  end

  def test_passing_id_deletes_only_that_schedule
    completed_schedule = build(
      :article_status_schedule, article: @article, article_status: "draft", schedule_status: "done")
    completed_schedule.save(validate: false)
    @article.reload
    schedues_count = @article.article_status_schedules.count
    DeleteScheduleService.new(completed_schedule.id).process!
    @article.reload
    assert_equal schedues_count - 1, @article.article_status_schedules.count
  end
end
