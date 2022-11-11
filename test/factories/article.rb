# frozen_string_literal: true

FactoryBot.define do
  factory :article do
    association :assigned_category, factory: :category
    association :user, factory: :user
    title { Faker::Lorem.sentence }
    body { Faker::Lorem.paragraph }
    status { ["draft", "published"].sample() }
  end
end
