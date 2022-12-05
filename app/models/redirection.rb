# frozen_string_literal: true

class Redirection < ApplicationRecord
  VALID_PATH_REGEX = /\A(?!\/)
  ([a-zA-Z0-9-]+|\/)+$
  /x

  belongs_to :user

  validates :from_path, uniqueness: true, format: VALID_PATH_REGEX, presence: true
  validates :to_path, format: VALID_PATH_REGEX, presence: true
  validate :loop_checking

  private

    def loop_checking
      if from_path == to_path
        errors.add(:base, t("from_path_same_as_to_path"))
      end
      current_user = User.first
      all_from_paths = current_user.redirections.pluck(:from_path)
      possible_from_path = to_path
      redirection_path = from_path
      while all_from_paths.include?(possible_from_path) do
        redirection_path += ("->" + to_path + "->")
        to_path_of_possible_from_path = current_user.redirections.find_by!(from_path: possible_from_path).to_path
        possible_from_path = to_path_of_possible_from_path
        redirection_path += possible_from_path

        if possible_from_path == from_path
          errors.add(:base, t("redirection_loop_path") + redirection_path)
          break
        end
      end
    end
end
