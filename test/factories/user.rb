# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    association :organization, factory: :organization
    name { Faker::Name.name[1..25] }
  end
end
