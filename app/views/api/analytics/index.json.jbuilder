# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article,
    :id,
    :title,
    :updated_at,
    :slug
  json.visits article.article_visits.count
  json.category_name article.assigned_category.name
end

json.article_count @all_articles_count
