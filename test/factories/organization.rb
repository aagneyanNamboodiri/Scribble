# frozen_string_literal: true

FactoryBot.define do
  factory :organization do
    site_name { "Spinkart" }
    is_password { true }
    password { "admin1" }
    authentication_token { Faker::Alphanumeric.alphanumeric(number: 10) }
  end
end
