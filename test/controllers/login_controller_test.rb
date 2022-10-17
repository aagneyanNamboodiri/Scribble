# frozen_string_literal: true

require "test_helper"

class LoginControllerTest < ActionDispatch::IntegrationTest
  def setup
    @preference = create(:preference, password_digest: "admin1")
  end

  def test_wrong_password_should_send_error_response
    @preference.is_password = true
    @preference.password_digest = "admin1"
    @preference.save!
    post login_path, params: { password: "I am the storm that is approaching" },
      headers: headers
    response_json = response.parsed_body
    assert_equal response_json["error"], "Incorrect credentials, try again."
  end

  def test_correct_password_should_send_correct_response
    @preference.is_password = true
    @preference.password_digest = "admin2"
    @preference.save!
    post login_path, params: { password: "admin2" },
      headers: headers
    assert_response 201
  end

  def test_session_cookie_set_for_correct_password
    @preference.is_password = true
    @preference.save!
    post login_path, params: { password: "admin1" },
      headers: headers
    assert_equal session[:auth].nil?, false
  end

  def test_session_cookie_not_set_for_wrong_password
    @preference.is_password = true
    @preference.save!
    post login_path, params: { password: "Cus im only a crack in the castle of glass" },
      headers: headers
    assert_equal session[:auth].nil?, true
  end
end
