# frozen_string_literal: true

class ArticleStatusSchedule < ApplicationRecord
  enum schedule_status: { pending: "pending", done: "done" }
  enum article_status: { published: "published", draft: "draft" }

  belongs_to :article

  validates :scheduled_time, presence: true, pending_schedule_time_future: true
  validates :scheduled_time, latest_schedule: true, on: :create
  validates :article_status, latest_schedule: true, on: :create

  validate :article_status_and_scheduled_time_are_immutable

  private

    def article_status_and_scheduled_time_are_immutable
      if scheduled_time_changed? && self.persisted?
        errors.add(:base, t("immutable", entity: "Scheduled time"))
      end
      if article_status_changed? && self.persisted?
        errors.add(:base, t("immutable", entity: "Article status"))
      end
    end
end
