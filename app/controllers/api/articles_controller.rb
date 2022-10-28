# frozen_string_literal: true

class Api::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy]
  before_action :search_params, only: %i[index]

  def index
    search_query_filtered_articles = current_user.articles.where(
      "lower(title) like ?",
      "%#{@search_term.downcase}%").order(updated_at: :desc)
    status_filtered_articles = search_query_filtered_articles.select { |article|
    @status_to_filter == "all" || article.status == @status_to_filter }
    if @categories_to_filter_with.length == 0
      @articles = status_filtered_articles
    else
      @articles = status_filtered_articles.select { |article|
        @categories_to_filter_with.include? article.assigned_category.name }
    end
  end

  def create
    current_user.articles.create!(article_params)
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def show
    if !@article
      respond_with_error(t("doesnt_exist", entity: "Article"))
    end
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  def destroy
    @article.destroy!
    respond_with_success(t("successfully_destroyed", entity: "Article"))
  end

  private

    def search_params
      @search_term = params[:search_query] || ""
      @categories_to_filter_with = params[:selected_category_fiter] || []
      @status_to_filter = params[:article_status] || "all"
    end

    def load_article!
      @article = current_user.articles.find(params[:id])
    end

    def article_params
      params.require(:article).permit([:title, :body, :assigned_category_id, :status])
    end
end
