# frozen_string_literal: true

module SeedData
  class SeedArticleVersions
    attr_reader :organization, :user

    def initialize
      @organization = Organization.find_by!(site_name: "Spinkart")
      @user = organization.user
    end

    def process!
      update_random_articles!
    end

    private

      def update_random_articles!(options = {})
        five_random_articles = user.articles.order("random()").first(5)
        some_cool_titles = ["This article was one among legendary chosen ones!", "Versions? Hah, I got them!",
"Lets keep things interesting, shall we?", "A godlike presence!", "Something other than Lorem Ipsum!"]
        15.times do |index|
          article = five_random_articles.sample()
          article.update!(
            title: some_cool_titles.sample(),
            status: [:published, :draft].sample())
        end
      end
  end
end
