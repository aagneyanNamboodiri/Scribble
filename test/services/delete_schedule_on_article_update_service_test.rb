# frozen_string_literal: true

require "test_helper"

class DeleteScheduleOnArticleUpdateServiceTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, user: @user, assigned_category: @category, status: "published")
    @article_two = create(:article, user: @user, assigned_category: @category, status: "draft")
    @pending_schedule = build(
      :article_status_schedule, article: @article, article_status: "draft")
    @current_time = Time.zone.now
    @article_params = {
      title: @article.title, body: @article.body, status: "draft",
      assigned_category_id: @category.id, restored_from: nil
    }
  end

  def test_deletes_upcoming_draft_schedule_if_article_gets_restored
    @pending_schedule.save!
    @article_params[:restored_from] = 22
    assert_difference "@article.article_status_schedules.count", -1 do
      DeleteScheduleOnArticleUpdateService.new(@article_params, @article.id).process!
    end
  end

  def test_doesnt_delete_upcoming_publish_schedule_on_article_restoration
    @pending_schedule.article_status = "published"
    @pending_schedule.save!
    @article_params[:restored_from] = 22
    schedules_count = @article.article_status_schedules.count
    DeleteScheduleOnArticleUpdateService.new(@article_params, @article.id).process!
    @article.reload
    assert_equal schedules_count, @article.article_status_schedules.count
  end

  def test_deletes_duplicate_schedule_if_it_exists_upon_manual_article_status_update
    pending_schedule = build(
      :article_status_schedule, article: @article_two, article_status: "published")
    pending_schedule.save!
    @article_params[:status] = "published"
    assert_difference "@article_two.article_status_schedules.count", -1 do
      DeleteScheduleOnArticleUpdateService.new(@article_params, @article_two.id).process!
    end
  end

  def test_non_duplicate_schedules_are_not_deleted
    @article_params[:status] = "published"
    @article_params[:title] = "Test title"
    schedules_count = @article.article_status_schedules.count
    DeleteScheduleOnArticleUpdateService.new(@article_params, @article.id).process!
    @article.reload
    assert_equal schedules_count, @article.article_status_schedules.count
  end

  def test_completed_schedules_are_left_untouched
    completed_schedule_one = build(
      :article_status_schedule, article: @article, article_status: "draft", schedule_status: "done")
    completed_schedule_two = build(
      :article_status_schedule, article: @article, article_status: "draft", schedule_status: "done")
    completed_schedule_one.save(validate: false)
    completed_schedule_two.save(validate: false)
    completed_schedules = @article.article_status_schedules.where(schedule_status: :done).count
    DeleteScheduleOnArticleUpdateService.new(@article_params, @article.id).process!
    @article.reload
    assert_equal completed_schedules,
      @article.article_status_schedules.where(schedule_status: :done).count
  end
end
