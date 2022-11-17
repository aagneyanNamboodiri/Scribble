# frozen_string_literal: true

require "test_helper"

class LoginControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
  end

  def test_wrong_password_should_send_error_response
    @organization.save!
    post api_login_path, params: { password: "notadmin123" },
      headers: headers
    assert_equal t("incorrect_credentials"), response_to_json(response)["error"]
  end

  def test_correct_password_should_send_correct_response
    @organization.save!
    post api_login_path, params: { password: "admin1" },
      headers: headers

    assert_response :created
  end

  def test_session_cookie_set_for_correct_password
    @organization.save!
    post api_login_path, params: { password: "admin1" },
      headers: headers

    assert_equal false, session[:auth].nil?
  end

  def test_session_cookie_not_set_for_wrong_password
    @organization.save!
    post api_login_path, params: { password: "notadmin123" },
      headers: headers

    assert_equal t("incorrect_credentials"), response_to_json(response)["error"]
    assert_equal true, session[:auth].nil?
  end

  def test_user_should_be_authorized_regardless_if_password_protection_is_false
    @organization.is_password = false
    @organization.save!
    post api_login_path, params: {}, headers: headers

    assert_equal true, session[:auth].nil?
  end
end
