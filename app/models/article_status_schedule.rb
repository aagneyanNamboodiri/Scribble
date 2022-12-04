# frozen_string_literal: true

class ArticleStatusSchedule < ApplicationRecord
  enum schedule_status: { pending: "pending", done: "done" }
  enum article_status: { published: "published", draft: "draft" }

  belongs_to :article

  validates :scheduled_time, presence: true, schedule_time_future: true
  validate :article_cannot_be_scheduled_earlier_than_any_existing_schedules, on: :create
  validate :article_status_change_should_be_different_from_the_last_pending_schedule, on: :create
  validate :completed_schedule_cannot_be_in_the_future
  validate :article_status_and_scheduled_time_are_immutable
  validate :first_schedule_cannot_be_same_as_current_article_status

  private

    def article_cannot_be_scheduled_earlier_than_any_existing_schedules
      latest_schedule = get_latest_schedule_for_an_article
      if !latest_schedule.nil? &&
          scheduled_time <= latest_schedule.scheduled_time
        errors.add(:base, t("select_time_after_latest_schedule"))
      end
    end

    def article_status_change_should_be_different_from_the_last_pending_schedule
      latest_schedule = get_latest_schedule_for_an_article
      if !latest_schedule.nil? &&
        article_status == latest_schedule.article_status
        errors.add(:base, t("duplicate_schedule"))
      end
    end

    def completed_schedule_cannot_be_in_the_future
      if schedule_status == "done" && scheduled_time > Time.zone.now
        errors.add(:base, t("completed_schedule_cant_be_in_future"))
      end
    end

    def article_status_and_scheduled_time_are_immutable
      if scheduled_time_changed? && self.persisted?
        errors.add(:base, t("immutable", entity: "Scheduled time"))
      end
      if article_status_changed? && self.persisted?
        errors.add(:base, t("immutable", entity: "Article status"))

      end
    end

    def first_schedule_cannot_be_same_as_current_article_status
      if get_latest_schedule_for_an_article.nil? &&
          Article.find(article_id).status == article_status
        errors.add(:base, t("cant_queue_current_article_status"))
      end
    end

    def get_latest_schedule_for_an_article
      ArticleStatusSchedule.where(
        article_id: article_id,
        schedule_status: :pending
      ).order(scheduled_time: :desc).first
    end
end
