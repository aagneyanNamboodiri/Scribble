# frozen_string_literal: true

class FrontendRoute < ApplicationRecord
  validates :route, presence: true
end
