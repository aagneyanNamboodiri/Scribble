# frozen_string_literal: true

class Public::ArticlesController < Public::BaseController
  before_action :check_if_user_is_authorized
  before_action :get_published_articles, only: %i[index show]

  def index
    @articles = ArticleFilteringService.new(
      [], "published", params[:search_term],
      current_user).process.order(:position)
  end

  def show
    @article = @published_articles.find_by(slug: params[:slug])
    if !@article
      respond_with_error(t("doesnt_exist", entity: "Article"))
    else
      @article.article_visits.create!(visit_date: Time.zone.now.to_date)
    end
  end

  def get_published_articles
    @published_articles = current_user.articles.all.where(status: "published")
  end
end
