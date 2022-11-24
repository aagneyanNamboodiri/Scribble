# frozen_string_literal: true

class ArticleStatusSchedulingWorker
  include Sidekiq::Worker

  def perform
    todo_notification_service = ArticleStatusSchedulingService.new
    todo_notification_service.process
  end
end
