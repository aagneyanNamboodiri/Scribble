# frozen_string_literal: true

class Preference < ApplicationRecord
  MAX_SITENAME_LENGTH = 25
  has_secure_token :authentication_token

  validates :site_name, presence: true, length: { maximum: MAX_SITENAME_LENGTH }
  validates :password_digest, presence: true, length: { minimum: 6 } if -> { is_password }
end
