# frozen_string_literal: true

json.articles @articles_of_category do |article|
  json.extract! article,
    :id,
    :body,
    :title,
    :updated_at,
    :status
end
