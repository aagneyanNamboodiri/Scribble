# frozen_string_literal: true

class LatestScheduleValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    latest_schedule = get_latest_schedule_for_an_article(record)

    if attribute == :scheduled_time
      if !latest_schedule.nil? && value <= latest_schedule.scheduled_time
        record.errors.add(:base, I18n.t("select_time_after_latest_schedule"))
      end
    else
      if !latest_schedule.nil? && value == latest_schedule.article_status
        record.errors.add(:base, I18n.t("duplicate_schedule"))
      end
      if latest_schedule.nil? &&
        Article.find(record.article_id).status == value
        record.errors.add(:base, I18n.t("cant_queue_current_article_status"))
      end
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
