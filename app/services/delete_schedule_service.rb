# frozen_string_literal: true

class DeleteScheduleService
  attr_reader :id, :current_user

  def initialize(id, current_user)
    @id = id
    @current_user = current_user
  end

  def process!
    delete_schedule_service
  end

  private

    def delete_schedule_service
      schedule = ArticleStatusSchedule.find(id)
      article = current_user.articles.find(schedule.article_id)
      schedules_for_article = article.article_status_schedules.all.order(scheduled_time: :asc)
      duplicate_schedule = schedules_for_article.find_by("scheduled_time > ?", schedule.scheduled_time)
      if !duplicate_schedule.nil?
        duplicate_schedule.destroy!
      end
      schedule.destroy!
    end
end
