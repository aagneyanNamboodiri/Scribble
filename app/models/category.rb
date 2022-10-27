# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_CATEGORY_LENGTH = 25
  VALID_CATEGORY_NAME_REGEX = /[a-zA-Z0-9]+/

  belongs_to :user
  has_many :articles, class_name: "Article", foreign_key: "assigned_category_id"

  validates :name, presence: true, uniqueness: true, format: VALID_CATEGORY_NAME_REGEX
  validates :name, length: { maximum: MAX_CATEGORY_LENGTH }

  acts_as_list order: :position
end
