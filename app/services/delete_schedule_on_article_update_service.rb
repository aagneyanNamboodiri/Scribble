# frozen_string_literal: true

class DeleteScheduleOnArticleUpdateService
  attr_reader :article_params, :article_id

  def initialize(article_params, article_id)
    @article_params = article_params
    @article_id = article_id
  end

  def process
    delete_schedule_on_article_update
  end

  private

    def delete_schedule_on_article_update
      article = Article.find(article_id)
      article_schedules = article.article_status_schedules.order(scheduled_time: :asc)
      if article_schedules.exists?
        if article.status != article_params[:status]
          article_schedules.first.destroy!
        end
      end
    end
end
