# frozen_string_literal: true

class Api::AnalyticsController < ApplicationController
  before_action :load_article!, only: %i[show]
  before_action :load_page_number_and_page_limit, only: %i[index]

  def index
    published_articles = current_user.articles.where(status: :published)
    @articles = published_articles.page(@page_number).per(@page_limit)
    @all_articles_count = published_articles.count
  end

  def show
    @visits = { visit_count: @article.article_visits.group(:visit_date).count }
  end

  private

    def load_article!
      @article = current_user.articles.find(params[:id])
    end

    def load_page_number_and_page_limit
      @page_number = params[:page_number]
      @page_limit = Article::PAGE_LIMIT
    end
end
