# frozen_string_literal: true

desc "drops the db, creates db, migrates db and populates sample data"
task setup: [:environment, "db:drop", "db:create", "db:migrate"] do
  Rake::Task["reset_and_populate_sample_data"].invoke if Rails.env.development?
end

desc "Populates sample data without resetting the database first"
task populate_sample_data: [:environment] do
  create_sample_data!
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
  create_user!
  create_preference!
  create_category!
end

def create_user!(options = {})
  user_attributes = {
    name: "Oliver Smith"
  }
  attributes = user_attributes.merge options
  User.create! attributes
end

def create_preference!(options = {})
  preference_attributes = {
    site_name: "Spinkart",
    is_password: true,
    password_digest: "admin1"
  }
  attributes = preference_attributes.merge options
  Preference.create! attributes
end

def create_category!(options = {})
  category_attributes = {
    name: "Getting Started"
  }
  attributes = category_attributes.merge options
  Category.create! attributes
end