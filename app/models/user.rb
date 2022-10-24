# frozen_string_literal: true

class User < ApplicationRecord
  MAX_USERNAME_LENGTH = 25

  has_many :articles
  has_many :redirections
  has_many :categories

  validates :name, presence: true, uniqueness: true, length: { maximum: MAX_USERNAME_LENGTH }
end
