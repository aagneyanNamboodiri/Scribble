# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_CATEGORY_LENGTH = 50
  has_many :articles, class_name: "Article", foreign_key: "assigned_category_id"
  validates :name, presence: true, uniqueness: true, length: { maximum: MAX_CATEGORY_LENGTH }
end
