# frozen_string_literal: true

class ArticlesController < ApplicationController
  before_action :load_article!, only: %i[show update destroy]
  before_action :load_user, only: %i[create]
  def index
    @articles = Article.all
  end

  def create
    @user.articles.create!(article_params)
    respond_with_success("Article was successfully created")
  end

  def show
  end

  def update
    @article.update!(article_params)
    respond_with_success("Task was successfully updated!")
  end

  def destroy
    @article.destroy!
    respond_with_success("Article was successfully deleted!")
  end

  private

    def load_article!
      @article = Article.find_by!(slug: params[:slug])
    end

    def article_params
      params.require(:article).permit([:title, :body, :user_id, :assigned_category_id])
    end

    def load_user
      @user = User.first
    end
end
