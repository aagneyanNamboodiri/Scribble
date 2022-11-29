# frozen_string_literal: true

module SeedData
  class SeedArticles
    attr_reader :organization, :user

    def initialize
      @organization = Organization.find_by!(site_name: "Spinkart")
      @user = organization.user
    end

    def process!
      create_articles!
    end

    private

      def create_articles!(options = {})
        20.times do |index|
          user.articles.create!(
            title: Faker::Lorem.sentence,
            body: Faker::Lorem.paragraph(sentence_count: rand(5..30)),
            assigned_category: Category.find(user.categories.pluck(:id).sample),
            status: ["draft", "published"].sample()
          )
        end
      end
  end
end
