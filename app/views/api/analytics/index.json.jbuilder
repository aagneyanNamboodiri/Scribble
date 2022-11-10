# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article,
    :id,
    :title,
    :updated_at,
    :visits
  json.category_name article.assigned_category.name
end
