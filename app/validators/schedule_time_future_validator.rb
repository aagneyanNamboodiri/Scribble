# frozen_string_literal: true

class ScheduleTimeFutureValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    if record.schedule_status == "pending" && value < Time.zone.now
      record.errors.add(:base, I18n.t("schedule_cant_be_in_past"))
    end
  end
end
