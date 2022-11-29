# frozen_string_literal: true

module SeedData
  class SeedRedirections
    attr_reader :organization, :user

    def initialize
      @organization = Organization.find_by!(site_name: "Spinkart")
      @user = organization.user
    end

    def process!
      create_redirections!
    end

    private

      def create_redirections!(options = {})
        user.redirections.create!(
          from_path: "a",
          to_path: "b"
        )
        user.redirections.create!(
          from_path: "b",
          to_path: "c"
        )
      end
  end
end
