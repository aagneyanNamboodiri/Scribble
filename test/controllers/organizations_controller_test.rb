# frozen_string_literal: true

require "test_helper"

class OrganizationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: true, password_digest: "admin1")
  end

  def test_listing_organizations
    get organizations_path, headers: headers
    assert_response :success

    response_json = response.parsed_body
    assert_equal response_json["site_name"], @organization.site_name
  end

  def test_site_name_shouldnt_be_empty
    @organization.site_name = ""
    assert_raises ActiveRecord::RecordInvalid do
      @organization.save!
    end
  end

  def test_password_should_exist_if_is_password_is_true
    @organization.is_password = true
    @organization.password_digest = ""
    assert_raises ActiveRecord::RecordInvalid do
      @organization.save!
    end
  end

  def test_password_digest_length_is_atleast_six_characters
    @organization.password_digest = "close"
    assert_raises ActiveRecord::RecordInvalid do
      @organization.save!
    end
  end

  def test_organization_should_get_updated
    @organization.save!
    organization_params = {
      organization: {
        site_name: "Spinboi",
        is_password: false,
        password_digest: "admin2"
      }
    }
    put organization_path(@organization.id), params: organization_params, headers: headers
    assert_response :success
  end
end
