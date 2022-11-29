# frozen_string_literal: true

module SeedData
  class SeedVisits
    attr_reader :organization, :user

    def initialize
      @organization = Organization.find_by!(site_name: "Spinkart")
      @user = organization.user
    end

    def process!
      create_article_visits!
    end

    private

      def create_article_visits!(options = {})
        some_published_articles = user.articles.where(status: "published").first(5)
        50.times do |index|
          article = some_published_articles.sample()
          article.article_visits.create!(visit_date: Time.zone.now.to_date)
        end
      end
  end
end
