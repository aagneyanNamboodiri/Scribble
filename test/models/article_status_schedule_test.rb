# frozen_string_literal: true

require "test_helper"

class ArticleStatusScheduleTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = create(:article, assigned_category: @category, user: @user, status: "published")
    @article_schedule = build(:article_status_schedule, article: @article)
  end

  def test_scheduled_time_cannot_be_in_the_past
    @article_schedule.scheduled_time = Time.zone.now() - 5
    assert_not @article_schedule.valid?
    assert_includes t("schedule_cant_be_in_past"), @article_schedule.errors.full_messages[0]
  end

  def test_scheduled_time_must_be_valid_and_present
    @article_schedule.scheduled_time = "invalid time"
    assert_not @article_schedule.valid?
    assert_includes "Scheduled time can't be blank", @article_schedule.errors.full_messages[0]
  end

  def test_created_schedule_cannot_be_before_any_existing_schedule
    new_time = Time.zone.now + (1 * 60)
    @article_schedule.scheduled_time = Time.zone.now + (1 * 60 * 60)
    @article_schedule.save!
    new_schedule = build(:article_status_schedule, article: @article, scheduled_time: new_time)
    assert_not new_schedule.valid?
    assert_includes t("select_time_after_latest_schedule"), new_schedule.errors.full_messages[0]
  end

  def test_new_schedule_cannot_have_duplicate_article_status_udpate_for_same_article
    @article_schedule.save!
    new_schedule = build(
      :article_status_schedule, article: @article, article_status: @article_schedule.article_status
    )
    assert_not new_schedule.valid?
    assert_includes t("duplicate_schedule"), new_schedule.errors.full_messages[0]
  end

  def test_new_schedule_can_have_same_article_status_udpate_for_different_articles
    @article_schedule.save!
    article_two = create(:article, assigned_category: @category, user: @user, status: "published")
    new_schedule = build(
      :article_status_schedule, article: article_two, article_status: @article_schedule.article_status
    )
    assert new_schedule.valid?
  end

  def test_completed_schedules_cannot_be_in_the_future
    new_schedule = build(
      :article_status_schedule, article: @article, schedule_status: :done
    )
    assert_not new_schedule.valid?
    assert_includes t("completed_schedule_cant_be_in_future"), new_schedule.errors.full_messages[0]
  end

  def test_article_status_and_scheduled_time_are_cannot_be_changed
    new_schedule = build(:article_status_schedule, article: @article, article_status: "draft")
    new_schedule.save!
    assert_raises ActiveRecord::RecordInvalid do
      new_schedule.article_status = "published"
      new_schedule.save!
    end
    assert_includes t("immutable", entity: "Article status"), new_schedule.errors.full_messages[0]

    assert_raises ActiveRecord::RecordInvalid do
      new_schedule.scheduled_time = Time.zone.now + (1 * 60) + 20
      new_schedule.save!
    end
    assert_includes t("immutable", entity: "Scheduled time"), new_schedule.errors.full_messages[0]
  end

  def test_article_status_cannot_be_first_schedule
    test_article = create(:article, assigned_category: @category, user: @user, status: "published")
    test_schedule = build(:article_status_schedule, article: test_article, article_status: "published")
    assert_not test_schedule.valid?
    assert_raises ActiveRecord::RecordInvalid do
      test_schedule.save!
    end
    assert_includes t("cant_queue_current_article_status"), test_schedule.errors.full_messages[0]
  end
end
