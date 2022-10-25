# frozen_string_literal: true

require "test_helper"

class OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: true, password: "admin1", password_confirmation: "admin1")
  end

  def test_listing_organizations
    get organizations_path, headers: headers
    assert_response :success

    response_json = response.parsed_body
    assert_equal response_json["site_name"], @organization.site_name
  end

  def test_organization_should_get_updated
    @organization.save!
    organization_params = {
      organization: {
        site_name: "Spinboi",
        is_password: true,
        password: "admin2"
      }
    }
    put organization_path(@organization.id), params: organization_params, headers: headers
    response_json = response.parsed_body

    assert_response :success
    assert_equal response_json["notice"], "Settings was successfully updated!"
end

  def test_only_organization_name_should_get_updated
    @organization.save!
    organization_params = {
      organization: {
        site_name: "Spinboi"
      }
    }
    put organization_path(@organization.id), params: organization_params, headers: headers
    response_json = response.parsed_body

    assert_response :success
    assert_equal response_json["notice"], "Settings was successfully updated!"
  end
end
