# frozen_string_literal: true

require "test_helper"

class Public::OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: false)
    @headers = headers()
  end

  def test_get_correct_organization
    get public_organizations_path, headers: headers
    assert_response :success

    response_json = response.parsed_body
    site_name = response_json["site_name"]
    password_digest = response_json["password_digest"]
    current_organization = Organization.first
    assert_equal site_name, current_organization.site_name
    assert_equal password_digest, current_organization.password_digest
  end
end
