# frozen_string_literal: true

class User < ApplicationRecord
  MAX_USERNAME_LENGTH = 25

  has_many :articles
  validates :name, presence: true, uniqueness: true, length: { maximum: MAX_USERNAME_LENGTH }
end
