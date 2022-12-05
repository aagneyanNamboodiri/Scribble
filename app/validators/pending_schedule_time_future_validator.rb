# frozen_string_literal: true

class PendingScheduleTimeFutureValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if record.schedule_status == "pending" && !value.nil? && value < Time.zone.now
      record.errors.add(:base, I18n.t("schedule_cant_be_in_past"))
    end
    if record.schedule_status == "done" && !value.nil? && value > Time.zone.now
      record.errors.add(:base, I18n.t("completed_schedule_cant_be_in_future"))
    end
  end
end
