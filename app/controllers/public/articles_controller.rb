# frozen_string_literal: true

class Public::ArticlesController < Public::BaseController
  before_action :check_if_user_is_authorized

  def index
    @articles = Article.all.where(status: "published")
  end

  def show
    @article = Article.where(status: "published").find_by(slug: params[:slug])
    if !@article
      respond_with_error(t("doesnt_exist", entity: "Article"))
    end
  end
end
