# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy]
  before_action :load_user, only: %i[create index]
  before_action :search_params, only: %i[index]

  def index
    search_query_filtered_articles = @user.articles.all.where("title like ?", "%#{@search_term}%")
    status_filtered_articles = search_query_filtered_articles.select { |art|
    @status_to_filter == "all" || art.status == @status_to_filter }
    if @categories_to_filter_with.length == 0
      @articles = status_filtered_articles
    else
      @articles = status_filtered_articles.select { |art|
        @categories_to_filter_with.include? art.assigned_category.name }
    end
  end

  def create
    @user.articles.create!(article_params)
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
      @search_term = params[:searchQuery] || ""
      @categories_to_filter_with = params[:selectedCategoryFilter] || []
      @status_to_filter = params[:articleStatus] || "all"
    end

    def load_article!
      @article = Article.find(params[:id])
    end

    def article_params
      params.require(:article).permit([:title, :body, :assigned_category_id, :status])
    end

    def load_user
      @user = User.first
    end
end
