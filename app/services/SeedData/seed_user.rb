# frozen_string_literal: true

module SeedData
  class SeedUser
    attr_reader :organization

    def initialize
      @organization = Organization.find_by!(site_name: "Spinkart")
    end

    def process!
      create_user!
    end

    private

      def create_user!(options = {})
        user_attributes = {
          name: "Oliver Smith"
        }
        attributes = user_attributes.merge options
        organization.create_user! attributes
      end
  end
end
