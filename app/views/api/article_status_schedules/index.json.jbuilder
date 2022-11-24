# frozen_string_literal: true

json.schedules @schedules do |schedule|
  json.extract! schedule,
    :id,
    :schedule_status,
    :scheduled_time,
    :article_status
end
