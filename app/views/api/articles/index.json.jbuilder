# frozen_string_literal: true

json.articles @articles do |article|
  json.partial! "api/articles/article", article: article
  json.user_name article.user.name
  json.category_name article.assigned_category.name
end

json.count @count
