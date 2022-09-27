# frozen_string_literal: true

json.categories @categories do |c|
  json.extract! c,
    :id,
    :name
end
