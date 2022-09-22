# frozen_string_literal: true

class Article < ApplicationRecord
  MAX_TITLE_LENGTH = 200
  MAX_BODY_LENGTH = 5000
  validates :title, presence: true length: { maximum: MAX_TITLE_LENGTH}
  validates :title, presence: true length: { maximum: MAX_BODY_LENGTH}
end
