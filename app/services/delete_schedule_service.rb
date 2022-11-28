# frozen_string_literal: true

class DeleteScheduleService
  attr_reader :id

  def initialize(id)
    @id = id
  end

  def process!
    delete_schedule_service
  end

  private

    def delete_schedule_service
      schedule = ArticleStatusSchedule.find(id)
      article = Article.find(schedule.article_id)
      schedules_for_article = article.article_status_schedules
        .where(schedule_status: :pending).order(scheduled_time: :asc)
      duplicate_schedule = schedules_for_article.find_by("scheduled_time > ?", schedule.scheduled_time)
      if schedule.schedule_status == "pending" && !duplicate_schedule.nil?
        duplicate_schedule.destroy!
      end
      schedule.destroy!
    end
end
