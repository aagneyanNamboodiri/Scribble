# frozen_string_literal: true

class Redirection < ApplicationRecord
  VALID_PATH_REGEX = /\A
  [\/]|[\/][a-zA-Z0-9-]+$
  /x

  validates :from_path, format: VALID_PATH_REGEX, presence: true
  validates :to_path, format: VALID_PATH_REGEX, presence: true
end
