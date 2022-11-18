# frozen_string_literal: true

json.article do
  json.extract! @article,
    :body,
    :assigned_category
  json.partial! "api/articles/article", article: @article
end
