# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    association :user, factory: :user
    name { Faker::Lorem.unique.word }
  end
end
