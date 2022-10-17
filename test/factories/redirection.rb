# frozen_string_literal: true

FactoryBot.define do
  factory :redirection do
    to_path { Faker::Internet.url(host: "example.com") }
    from_path { Faker::Internet.url(host: "example.com") }
  end
end
