# frozen_string_literal: true

class Redirection < ApplicationRecord
  VALID_PATH_REGEX = /\A
  [a-zA-Z0-9-]+$
  /x

  validates :from_path, uniqueness: true, format: VALID_PATH_REGEX, presence: true
  validates :to_path, format: VALID_PATH_REGEX, presence: true
  validate :loop_checking

  def loop_checking
    if from_path == to_path
      errors.add(:base, "From path cannot be the to path")
    end
    all_from_paths = Redirection.pluck(:from_path)
    all_to_paths = Redirection.pluck(:to_path)
    possible_from_path = to_path
    redirection_path = from_path
    while all_from_paths.include?(possible_from_path) do
      redirection_path += ("->" + to_path + "->")
      to_path_of_possible_from_path = Redirection.find_by(from_path: possible_from_path).to_path
      possible_from_path = to_path_of_possible_from_path
      redirection_path += possible_from_path
      if possible_from_path == from_path
        errors.add(
          :base,
          "This redirection forms a loop. Please change the redirection. Loop path : " + redirection_path)
        break
      end
    end
  end
end
