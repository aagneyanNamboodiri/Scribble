# frozen_string_literal: true

class Api::ArticleStatusSchedulesController < ApplicationController
  before_action :load_article!, only: %i[create index]

  def index
    @pending_schedules = @article.article_status_schedules.where(schedule_status: :pending)
      .order(scheduled_time: :asc)
    @completed_schedules = @article.article_status_schedules.where(schedule_status: :done)
      .order(scheduled_time: :desc)
  end

  def create
    @article.article_status_schedules.create!(schedule_params)
    respond_with_success("Article successfully scheduled to #{params[:schedule][:article_status]}")
  end

  def destroy
    DeleteScheduleService.new(params[:id], current_user).process!
    respond_with_success("The schedule has been deleted")
  end

  private

    def load_article!
      @article = current_user.articles.find(params[:article_id])
    end

    def schedule_params
      params.require(:schedule).permit([:scheduled_time, :article_status])
    end
end
