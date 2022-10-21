# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_CATEGORY_LENGTH = 25
  has_many :articles, class_name: "Article", foreign_key: "assigned_category_id"
  acts_as_list order: :position
  validates :name, presence: true, uniqueness: true
  validates :name, length: { maximum: MAX_CATEGORY_LENGTH }
end
