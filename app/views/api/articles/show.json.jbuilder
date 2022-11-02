# frozen_string_literal: true

json.extract! @article,
  :id,
  :title,
  :body,
  :slug,
  :assigned_category,
  :status
