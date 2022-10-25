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
  VALID_SITENAME_REGEX = /[a-zA-Z0-9]+/

  has_one :user

  validates :site_name, presence: true, length: { maximum: MAX_SITENAME_LENGTH }, format: VALID_SITENAME_REGEX
  validates :password, format: PASSWORD_VALIDATION_REGEX, if: :is_password
end
