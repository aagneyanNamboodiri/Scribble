# frozen_string_literal: true

json.articles @articles do |article|
  json.partial! "api/articles/article", article: article
  json.visits article.article_visits.count
  json.category_name article.assigned_category.name
end

json.article_count @all_articles_count
