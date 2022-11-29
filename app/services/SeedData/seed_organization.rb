# frozen_string_literal: true

module SeedData
  class SeedOrganization
    def process!
      create_organization!
    end

    private

      def create_organization!(options = {})
        organization_attributes = {
          site_name: "Spinkart",
          is_password: false
        }
        attributes = organization_attributes.merge options
        organization = Organization.new(attributes)
        organization.save(validations: false)
      end
  end
end
