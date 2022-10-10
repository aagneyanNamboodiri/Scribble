# frozen_string_literal: true

class Preference < ApplicationRecord
  MAX_SITENAME_LENGTH = 25

  validates :site_name, presence: true, length: { maximum: MAX_SITENAME_LENGTH }
end
