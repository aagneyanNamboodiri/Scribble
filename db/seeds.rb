# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Article.destroy_all
Category.destroy_all

p "Destroyed all articles and categories"

10.times do |index|
  Category.create!(
    name: Faker::Commerce.unique.department(max: 1)
  )
end

p "Created #{Category.count} categories"

100.times do |index|
  Article.create!(
    title: Faker::Lorem.sentence,
    body: Faker::Lorem.paragraph(sentence_count: rand(10..50)),
    assigned_category: Category.find(Category.pluck(:id).sample),
    user: User.first,
    status: ["draft", "published"].sample()
  )
end

p "Created #{Article.count} articles"
