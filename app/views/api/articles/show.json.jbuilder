# frozen_string_literal: true

json.extract! @article,
  :id,
  :title,
  :body,
  :slug,
  :assigned_category,
  :status,
  :created_at,
  :updated_at
