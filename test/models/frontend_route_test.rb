# frozen_string_literal: true

require "test_helper"

class FrontendRouteTest < ActiveSupport::TestCase
  def test_route_cannot_be_empty_string
    frontend_route = FrontendRoute.new(route: "")
    assert_not frontend_route.valid?
    assert_includes "Route can't be blank", frontend_route.errors.full_messages[0]
  end
end
