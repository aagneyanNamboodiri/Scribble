# frozen_string_literal: true

class ScheduleTimeFutureValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    byebug
    if record.schedule_status == "pending" && record.scheduled_time.present? &&
      record.scheduled_time < Time.zone.now
      errors.add(:base, t("schedule_cant_be_in_past"))
    end
  end
end
