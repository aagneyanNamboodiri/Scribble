# frozen_string_literal: true

FactoryBot.define do
  factory :organization do
    site_name { Faker::Name.name }
    is_password { [true, false].sample() }
    password { "admin1" }
    authentication_token { Faker::Alphanumeric.alphanumeric(number: 10) }
  end
end
