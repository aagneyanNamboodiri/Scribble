# frozen_string_literal: true

desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["reset_and_populate_sample_data"].invoke if Rails.env.development?
end

desc "Populates sample data without resetting the database first"
task populate_sample_data: [:environment] do
  # create_sample_data!
  SeedData::CallSeeders.new.process!
  puts "sample data has been added."
end

desc "Populates sample data without after resetting the database"
task reset_and_populate_sample_data: [:environment] do
  if Rails.env.production?
    puts "Skipping deleting and populating sample data"
  elsif Rails.env.staging?
    puts "Skipping deleting and populating sample data"
  else
    delete_all_records_from_all_tables
    Rake::Task["populate_sample_data"].invoke
  end
end

#
# DO NOT CHANGE ANYTHING IN THIS METHOD
# This is last layer of defense against deleting data in production
# If you need to delete data in staging or in production
# please execute the command manually and do not change this method
#
def delete_all_records_from_all_tables
  if Rails.env.production?
    raise "deleting all records in production is not alllowed"
  else
    Rake::Task["db:schema:load"].invoke
  end
end

def create_sample_data!
  create_organization!
  create_user!
  create_category!
  seed_data!
  seed_frontend_routes!
end

def create_user!(options = {})
  user_attributes = {
    name: "Oliver Smith"
  }
  attributes = user_attributes.merge options
  Organization.first.create_user! attributes
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

def create_category!(options = {})
  Category.reset_column_information

  category_attributes = {
    name: "Getting Started"
  }
  attributes = category_attributes.merge options
  User.first.categories.create! attributes
end

def seed_data!
  Article.reset_column_information
  Redirection.reset_column_information

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
