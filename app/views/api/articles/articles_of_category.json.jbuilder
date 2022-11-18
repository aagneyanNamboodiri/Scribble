# frozen_string_literal: true

json.articles @articles_of_category do |article|
  json.partial! "api/articles/article", article: article
  json.extract! article,
    :body
end
