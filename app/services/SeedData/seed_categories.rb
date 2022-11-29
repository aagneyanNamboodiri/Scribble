# frozen_string_literal: true

module SeedData
  class SeedCategories
    attr_reader :organization, :user

    def initialize
      @organization = Organization.find_by!(site_name: "Spinkart")
      @user = organization.user
    end

    def process!
      create_categories!
    end

    private

      def create_categories!(options = {})
        Category.reset_column_information
        5.times do
          user.categories.create!(
            name: Faker::Commerce.unique.department(max: 1)
          )
        end
      end
  end
end
