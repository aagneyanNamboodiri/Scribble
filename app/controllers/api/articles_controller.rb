# frozen_string_literal: true

class Api::ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy reorder]
  before_action :extract_search_params, only: %i[index]
  before_action :load_category!, only: %i[articles_of_category]

  def index
    @articles = ArticleFilteringService.new(
      @categories_to_filter_with, @status_to_filter, @search_term,
      current_user).process
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
    @article.update!(position: params[:position])
  end

  def articles_of_category
    @articles_of_category = @category.articles.order(:position)
  end

  def bulk_articles_category_update
    SwitchArticlesToNewCategoryService.new(
      params[:article_ids], params[:to_category], current_user
    ).process!
    respond_with_success(t("moved_articles_to_another_category"))
  end

  private

    def extract_search_params
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

    def load_category!
      @category = current_user.categories.find(params[:id])
    end
end
