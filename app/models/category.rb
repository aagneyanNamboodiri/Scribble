# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_CATEGORY_LENGTH = 25
  VALID_CATEGORY_NAME_REGEX = /[a-zA-Z0-9]+/

  has_many :articles, class_name: "Article", foreign_key: "assigned_category_id"
  acts_as_list order: :position

  validates :name, presence: true, uniqueness: true, format: VALID_CATEGORY_NAME_REGEX
  validates :name, length: { maximum: MAX_CATEGORY_LENGTH }

  belongs_to :user
end
