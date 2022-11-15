# frozen_string_literal: true

json.articles @articles_belonging_to_category do |article|
  json.extract! article,
    :id,
    :title,
    :body,
    :updated_at,
    :status
end
