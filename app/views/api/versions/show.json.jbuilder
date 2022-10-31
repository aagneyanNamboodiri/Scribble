# frozen_string_literal: true

json.extract! @article_by_version_id,
  :title,
  :body,
  :status
json.assigned_category Category.find(@article_by_version_id[:assigned_category_id])
