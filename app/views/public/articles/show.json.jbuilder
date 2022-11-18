# frozen_string_literal: true

json.article do
  json.partial! "api/articles/article", article: @article
  json.extract! @article,
    :body,
    :assigned_category
end
