# frozen_string_literal: true

module SeedData
  class CallSeeders
    def process!
      SeedData::SeedOrganization.new.process!
      SeedData::SeedUser.new.process!

      Article.reset_column_information
      Redirection.reset_column_information
      Category.reset_column_information

      SeedData::SeedCategories.new.process!
      SeedData::SeedArticles.new.process!
      SeedData::SeedRedirections.new.process!
      SeedData::SeedVisits.new.process!
      SeedData::SeedArticleVersions.new.process!
    end
  end
end
