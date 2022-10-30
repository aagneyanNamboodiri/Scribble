# frozen_string_literal: true

json.versions @versions_data do |version|
  json.extract! version,
    :id,
    :status,
    :time
end
