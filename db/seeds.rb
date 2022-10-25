# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

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
