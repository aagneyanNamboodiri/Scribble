# frozen_string_literal: true

class LatestScheduleValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    latest_schedule = get_latest_schedule_for_an_article(record)
    if !latest_schedule.nil? && attribute == :scheduled_time &&
        value <= latest_schedule.scheduled_time
      record.errors.add(:base, I18n.t("select_time_after_latest_schedule"))
    end
    if !latest_schedule.nil? && attribute == :article_status && value == latest_schedule.article_status
      record.errors.add(:base, I18n.t("duplicate_schedule"))
    end
  end

  private

    def get_latest_schedule_for_an_article(record)
      ArticleStatusSchedule.where(
        article_id: record.article_id,
        schedule_status: :pending
      ).order(scheduled_time: :desc).first
    end
end
