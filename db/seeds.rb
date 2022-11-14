# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def create_sample_data!
  create_organization!
  create_user!
  seed_data!
  seed_frontend_routes!
end

def create_organization!(options = {})
  organization_attributes = {
    site_name: "Spinkart",
    is_password: false
  }
  attributes = organization_attributes.merge options
  organization = Organization.new(attributes)
  organization.save!(validations: false)
end

def create_user!(options = {})
  user_attributes = {
    name: "Oliver Smith"
  }
  attributes = user_attributes.merge options
  Organization.first.create_user! attributes
end

def seed_data!
  Article.reset_column_information
  Redirection.reset_column_information
  Category.reset_column_information

  current_user = User.first

  Article.destroy_all
  p "Destroyed all articles"

  Category.destroy_all
  p "Destroyed all categories"

  5.times do |index|
    current_user.categories.create!(
      name: Faker::Commerce.unique.department(max: 1)
    )
  end

  p "Created #{current_user.categories.count} categories"

  20.times do |index|
    current_user.articles.create!(
      title: Faker::Lorem.sentence,
      body: Faker::Lorem.paragraph(sentence_count: rand(10..50)),
      assigned_category: Category.find(current_user.categories.pluck(:id).sample),
      status: ["draft", "published"].sample()
    )
  end

  p "Created #{current_user.articles.count} articles"
end

def seed_frontend_routes!
  FrontendRoute.create!(route: "articles")
  FrontendRoute.create!(route: "analytics")
  FrontendRoute.create!(route: "settings")
  FrontendRoute.create!(route: "public")
end

create_sample_data!
