# frozen_string_literal: true

class Api::ArticleStatusSchedulesController < ApplicationController
  before_action :load_article!, only: %i[create]

  def create
    @article.article_status_schedules.create!(schedule_params)
  end

  private

    def load_article!
      @article = current_user.articles.find(params[:article_id])
    end

    def schedule_params
      params.require(:schedule).permit([:schedule_time, :status])
    end
end
