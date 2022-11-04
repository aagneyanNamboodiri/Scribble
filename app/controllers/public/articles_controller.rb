# frozen_string_literal: true

class Public::ArticlesController < Public::BaseController
  before_action :check_if_user_is_authorized

  def index
    @articles = get_published_articles.where(
      "lower(title) like ?",
      "%#{params[:search_term].downcase}%")
  end

  def show
    @article = get_published_articles.find_by(slug: params[:slug])
    if !@article
      respond_with_error(t("doesnt_exist", entity: "Article"))
    end
    @article.increment!(:visits)
  end

  def get_published_articles
    published_articles = current_user.articles.all.where(status: "published")
  end
end
