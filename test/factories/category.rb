# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    name { Faker::Adjective.positive }
    articles_count { Faker::Number.digit }
  end
end
