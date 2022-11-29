# frozen_string_literal: true

module SeedData
  class SeedFrontendRoutes
    def process!
      create_frontend_routes!
    end

    private

      def create_frontend_routes!(options = {})
        FrontendRoute.create!(route: "articles")
        FrontendRoute.create!(route: "analytics")
        FrontendRoute.create!(route: "settings")
        FrontendRoute.create!(route: "public")
      end
  end
end
