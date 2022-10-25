# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    association :user, factory: :user
    to_path { Faker::Lorem.word }
    from_path { Faker::Lorem.word }
  end
end
