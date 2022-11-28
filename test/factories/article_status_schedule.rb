# frozen_string_literal: true

FactoryBot.define do
  factory :article_status_schedule do
    association :article, factory: :article
    schedule_status { [:done, :pending].sample() }
    article_status { [:draft, :published].sample() }
    scheduled_time { Faker::Time.between(from: DateTime.now - 1, to: DateTime.now) }
  end
end
