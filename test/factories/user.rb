# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    association :organization, factory: :organization
    name { Faker::Name.name }
  end
end
