# frozen_string_literal: true

class Organization < ApplicationRecord
  MAX_SITENAME_LENGTH = 25
  has_secure_password
  has_secure_token :authentication_token
  PASSWORD_VALIDATION_REGEX = /\A
  (?=.{6,})
  (?=.*\d)
  (?=.*[a-z])
  /x

  validates :site_name, presence: true, length: { maximum: MAX_SITENAME_LENGTH }
  validates :password, format: PASSWORD_VALIDATION_REGEX, if: :is_password
end
