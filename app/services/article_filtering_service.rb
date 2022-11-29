# frozen_string_literal: true

class ArticleFilteringService
  attr_reader :categories_filter, :status, :search_term, :current_user

  def initialize(categories_filter, status, search_term, current_user)
    @categories_filter = categories_filter
    @status = status
    @search_term = search_term
    @current_user = current_user
  end

  def process
    article_filtering_service
  end

  private

    def article_filtering_service
      filtered_articles = current_user.articles.where(
        "lower(title) like ?",
        "%#{search_term.downcase}%").order(updated_at: :desc)
      if status != "all"
        filtered_articles = filtered_articles.where(status: status)
      end
      if categories_filter.length > 0
        filtered_articles = filtered_articles.where(assigned_category_id: categories_filter)
      end
      filtered_articles
    end
end
