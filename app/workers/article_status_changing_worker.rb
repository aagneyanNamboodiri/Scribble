# frozen_string_literal: true

class ArticleStatusChangingWorker
  include Sidekiq::Worker

  def perform(schedule_id)
    schedule = ArticleStatusSchedule.find(schedule_id)
    article = Article.find(schedule.article_id)
    article.update!(status: schedule.article_status)
    schedule.update!(schedule_status: :done)
  end
end
