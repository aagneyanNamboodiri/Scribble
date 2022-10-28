# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article,
    :id,
    :slug,
    :title,
    :updated_at,
    :created_at,
    :status
  json.user_name article.user.name
  json.category_name article.assigned_category.name

end
