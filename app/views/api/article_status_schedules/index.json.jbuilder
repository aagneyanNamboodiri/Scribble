# frozen_string_literal: true

json.schedules do
  json.pending_schedules @pending_schedules do |schedule|
    json.partial! "api/article_status_schedules/schedule", schedule: schedule
  end
  json.completed_schedules @completed_schedules do |schedule|
    json.partial! "api/article_status_schedules/schedule", schedule: schedule
  end
end
