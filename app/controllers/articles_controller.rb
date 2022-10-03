# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy]
  before_action :load_user, only: %i[create]
  def index
    @articles = Article.all
  end

  def create
    @user.articles.create!(article_params)
    respond_with_success(t("successfully_created", entity: "Article"))
  end

  def show
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

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end

    def article_params
      params.require(:article).permit([:title, :body, :assigned_category_id, :status])
    end

    def load_user
      @user = User.first
    end
end
