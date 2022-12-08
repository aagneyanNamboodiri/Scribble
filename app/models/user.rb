# frozen_string_literal: true

class User < ApplicationRecord
  MAX_USERNAME_LENGTH = 25

  belongs_to :organization

  has_many :articles
  has_many :redirections
  has_many :categories
  has_one_attached :report

  validates :name, presence: true, uniqueness: true, length: { maximum: MAX_USERNAME_LENGTH }
end
