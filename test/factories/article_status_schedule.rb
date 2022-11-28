# frozen_string_literal: true

FactoryBot.define do
  factory :article_status_schedule do
    association :article, factory: :article
    schedule_status { "pending" }
    article_status { "draft" }
    scheduled_time { Time.zone.now + 60 }
  end
end
