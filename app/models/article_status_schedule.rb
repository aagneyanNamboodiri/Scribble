# frozen_string_literal: true

class ArticleStatusSchedule < ApplicationRecord
  belongs_to :article
  enum schedule_status: { pending: "pending", done: "done" }
  enum article_status: { published: "published", draft: "draft" }

  validates :scheduled_time, presence: true
  validate :scheduled_time_cannot_be_in_the_past
  validate :scheduled_time_is_valid
  validate :article_status_change_should_be_different_from_a_pending_schedule
  validate :article_cannot_be_scheduled_earlier_than_any_existing_schedules

  private

    def scheduled_time_cannot_be_in_the_past
      if scheduled_time.present? &&
          scheduled_time < Time.zone.now.hour
        errors.add(:scheduled_time, "can't be in the past")
      end
    end

    def scheduled_time_is_valid
      if scheduled_time.present?
        Time.zone.parse(scheduled_time.to_s)
      end
    rescue ArgumentError
      errors.add(:scheduled_time, "must be a valid date")
    end

    def article_cannot_be_scheduled_earlier_than_any_existing_schedules
      latest_schedule = get_latest_schedule_for_an_article
      if !latest_schedule.nil? &&
          scheduled_time <= latest_schedule.scheduled_time
        errors.add(:base, "Please select a time after the latest pending schedule")
      end
    end

    def article_status_change_should_be_different_from_a_pending_schedule
      if article_status == get_latest_schedule_for_an_article.article_status
        errors.add(:base, "This schedule already exists at a different time")
      end
    end

    def get_latest_schedule_for_an_article
      ArticleStatusSchedule.where(
        article_id: article_id,
        schedule_status: :pending
      ).order(scheduled_time: :desc).first
    end
end
