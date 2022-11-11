# frozen_string_literal: true

json.categories @categories do |category|
  json.extract! category,
    :id,
    :name,
    :articles_count,
    :position
end
