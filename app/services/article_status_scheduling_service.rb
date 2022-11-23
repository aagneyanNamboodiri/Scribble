# frozen_string_literal: true

class ArticleStatusSchedulingService
  def process
    change_article_status
  end

  private

    def change_article_status
      get_schedules_to_run.each do |schedule|
        ArticleStatusChangingWorker.perform_async(schedule.id)
      end
    end

    def get_schedules_to_run
      ArticleStatusSchedule.where(scheduled_time: ..Time.zone.now, schedule_status: :pending)
    end
end
