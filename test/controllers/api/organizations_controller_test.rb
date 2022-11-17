# frozen_string_literal: true

require "test_helper"

class OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: true, password: "admin1", password_confirmation: "admin1")
  end

  def test_listing_organization
    get api_organization_path, headers: headers
    assert_response :success

    assert_equal @organization.site_name, response_to_json(response)["site_name"]
  end

  def test_organization_should_get_updated_with_all_fields_passed
    @organization.save!
    organization_params = {
      organization: {
        site_name: "Spinboi",
        is_password: true,
        password: "admin2"
      }
    }
    put api_organization_path, params: organization_params, headers: headers

    assert_response :success
    assert_equal "Settings was successfully updated!", response_to_json(response)["notice"]
end

  def test_only_organization_name_should_get_updated
    @organization.save!
    organization_params = {
      organization: {
        site_name: "Spinboi"
      }
    }
    put api_organization_path, params: organization_params, headers: headers

    assert_response :success
    assert_equal "Settings was successfully updated!", response_to_json(response)["notice"]
  end
end
