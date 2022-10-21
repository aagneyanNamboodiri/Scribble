# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy]
  before_action :load_user, only: %i[create index]
  before_action :search_params, only: %i[index]

  def index
    @articles = @user.articles.all
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
      search_term = params[:searchQuery]
      categories_to_filter_with = params[:selectedCategoryFilter]
      status_to_filter = params[:articleStatus]
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
