# frozen_string_literal: true

class ArticlesController < ApplicationController
  def index
    articles = Article.all
    render status: :ok, json: { articles: articles }
  end

  def create
    article = Article.new(article_params)
    article.save!
    respond_with_success("Article was successfully created")
  end

  private

    def article_params
      params.require(:article).permit([:title, :body])
    end
end
