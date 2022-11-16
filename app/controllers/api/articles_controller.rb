# frozen_string_literal: true

class Api::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy reorder]
  before_action :search_params, only: %i[index]
  before_action :load_category!, only: %i[articles_of_category]

  def index
    @articles = filter_articles
    if @categories_to_filter_with.length == 0
      render
    end

    @articles = @articles.select { |article|
      @categories_to_filter_with.include? article.assigned_category.name }
  end

  def create
    current_user.articles.create!(article_params)
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def show
    render
  end

  def update
    @article.update!(article_params)
    respond_with_success(t("successfully_updated", entity: "Article"))
  end

  def destroy
    @article.destroy!
    respond_with_success(t("successfully_destroyed", entity: "Article"))
  end

  def reorder
    @article.update!(position: params["position"])
  end

  def articles_of_category
    @articles_of_category = @category.articles.order(:position)
  end

  def bulk_category_update
    byebug
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
      params.require(:article).permit([:title, :body, :assigned_category_id, :status, :restored_from])
    end

    def filter_articles
      search_query_filtered_articles = current_user.articles.where(
        "lower(title) like ?",
        "%#{@search_term.downcase}%").order(updated_at: :desc)
      status_filtered_articles = search_query_filtered_articles.select { |article|
      @status_to_filter == "all" || article.status == @status_to_filter }
    end

    def load_category!
      @category = current_user.categories.find(params[:id])
    end
end
