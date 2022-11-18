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
      search_query_filtered_articles = current_user.articles.where(
        "lower(title) like ?",
        "%#{search_term.downcase}%").order(updated_at: :desc)
      articles = search_query_filtered_articles.select { |article|
      status == "all" || article.status == status }
      if categories_filter.length > 0
        articles = articles.select { |article|
          categories_filter.include? article.assigned_category.name }
      end
      articles
    end
end
