# frozen_string_literal: true

json.redirections @redirections do |r|
  json.extract! r,
    :id,
    :from_path,
    :to_path
end
