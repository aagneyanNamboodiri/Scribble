# frozen_string_literal: true

class Public::ArticlesController < Public::BaseController
  before_action :check_if_user_is_authorized

  def index
    @articles = current_user.articles.all.where(status: "published").where(
      "lower(title) like ?",
      "%#{params[:search_term].downcase}%")
  end

  def show
    @article = current_user.articles.where(status: "published").find_by(slug: params[:slug])
    if !@article
      respond_with_error(t("doesnt_exist", entity: "Article"))
    end

    @article.increment!(:visits)
  end
end
