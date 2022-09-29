# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    name { Faker::Name.name }
    articles_count { Faker::Number.digit }
  end
end
