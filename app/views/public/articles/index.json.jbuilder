# frozen_string_literal: true

json.articles @articles do |article|
  json.partial! "public/articles/article", article: article
  json.status article.status
  json.category_name article.assigned_category.name

end
