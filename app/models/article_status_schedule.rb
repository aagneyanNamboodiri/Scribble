# frozen_string_literal: true

class ArticleStatusSchedule < ApplicationRecord
  belongs_to :article

  validates :schedule_time, presence: true
  validate :scheduled_time_cannot_be_in_the_past
  validate :scheduled_time_is_valid

  private

    def scheduled_time_cannot_be_in_the_past
      if schedule_time.present? &&
          schedule_time < Time.zone.now
        errors.add(:schedule_time, "can't be in the past")
      end
    end

    def scheduled_time_is_valid
      if schedule_time.present?
        Time.zone.parse(schedule_time.to_s)
      end
    rescue ArgumentError
      errors.add(:schedule_time, "must be a valid date")
    end
end
