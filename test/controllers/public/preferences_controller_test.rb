# frozen_string_literal: true

require "test_helper"

class Public::PreferencesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @preference = create(:preference, is_password: false)
    @headers = headers()
  end

  def test_get_correct_preference
    get public_preferences_path, headers: headers
    assert_response :success

    response_json = response.parsed_body
    site_name = response_json["site_name"]
    password_digest = response_json["password_digest"]
    current_preference = Preference.first
    byebug
    assert_equal site_name, current_preference.site_name
    assert_equal password_digest, current_preference.password_digest
  end
end
