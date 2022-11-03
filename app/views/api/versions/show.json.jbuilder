# frozen_string_literal: true

json.extract! @article_by_version_id,
  :title,
  :body,
  :status,
  :assigned_category
