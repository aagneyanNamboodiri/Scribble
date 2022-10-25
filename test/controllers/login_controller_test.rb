# frozen_string_literal: true

require "test_helper"

class LoginControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: true, password: "admin1", password_confirmation: "admin1")
  end

  def test_wrong_password_should_send_error_response
    @organization.save!
    post login_path, params: { password: "notadmin123" },
      headers: headers
    response_json = response.parsed_body

    assert_equal t("incorrect_credentials"), "Incorrect credentials, try again."
  end

  def test_correct_password_should_send_correct_response
    @organization.save!
    post login_path, params: { password: "admin1" },
      headers: headers

    assert_response 201
  end

  def test_session_cookie_set_for_correct_password
    @organization.save!
    post login_path, params: { password: "admin1" },
      headers: headers

    assert_equal session[:auth].nil?, false
  end

  def test_session_cookie_not_set_for_wrong_password
    @organization.save!
    post login_path, params: { password: "notadmin123" },
      headers: headers
    response_json = response.parsed_body

    assert_equal t("incorrect_credentials"), "Incorrect credentials, try again."
    assert_equal session[:auth].nil?, true
  end

  def test_user_should_be_authorized_regardless_if_password_protection_is_false
    @organization.is_password = false
    @organization.save!
    post login_path, params: {}, headers: headers
    response_json = response.parsed_body

    assert_equal t("login_successful", entity: @organization.site_name), "Welcome to #{@organization.site_name}"
    assert_equal true, session[:auth].nil?
  end
end
