# frozen_string_literal: true

FactoryBot.define do
  factory :article_visit do
    association :article, factory: :article
    visit_date { Faker::Date.forward(days: 2) }
  end
end
