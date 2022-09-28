# frozen_string_literal: true

json.articles @articles do |article|
  json.extract! article,
    :id,
    :slug,
    :title,
    :body,
    :created_at,
    :user_id
end
