# frozen_string_literal: true

class Api::AnalyticsController < ApplicationController
  before_action :load_article!, only: %i[show update destroy visits]

  def index
    @articles = current_user.articles.where(status: "published")
  end

  def show
    @visits = { visit_count: @article.article_visits.group(:visit_date).count }
  end

  private

    def load_article!
      @article = current_user.articles.find(params[:id])
    end
end
