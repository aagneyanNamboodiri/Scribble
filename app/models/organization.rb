# frozen_string_literal: true

class Organization < ApplicationRecord
  MAX_SITENAME_LENGTH = 25
  PASSWORD_VALIDATION_REGEX = /\A
  (?=.{6,})
  (?=.*\d)
  (?=.*[a-z])
  /x
  VALID_SITENAME_REGEX = /[a-zA-Z0-9]+/

  has_one :user

  validates :site_name, presence: true, length: { maximum: MAX_SITENAME_LENGTH }, format: VALID_SITENAME_REGEX
  validates :password, format: PASSWORD_VALIDATION_REGEX, if: :is_password
  validates :password, presence: true, if: :is_password

  has_secure_password(validations: false)
  has_secure_token :authentication_token

  before_save :destroy_password_if_password_protection_is_disabled

  private

    def destroy_password_if_password_protection_is_disabled
      if !is_password
        password = nil
      end
    end
end
