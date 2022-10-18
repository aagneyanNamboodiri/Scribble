# frozen_string_literal: true

require "test_helper"

class PreferencesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @preference = create(:preference, is_password: true, password_digest: "admin1")
  end

  def test_listing_preference
    get preferences_path, headers: headers
    assert_response :success

    response_json = response.parsed_body
    assert_equal response_json["site_name"], @preference.site_name
  end

  def test_site_name_shouldnt_be_empty
    @preference.site_name = ""
    assert_raises ActiveRecord::RecordInvalid do
      @preference.save!
    end
  end

  def test_password_should_exist_if_is_password_is_true
    @preference.is_password = true
    @preference.password_digest = ""
    assert_raises ActiveRecord::RecordInvalid do
      @preference.save!
    end
  end

  def test_password_digest_length_is_atleast_six_characters
    @preference.password_digest = "close"
    assert_raises ActiveRecord::RecordInvalid do
      @preference.save!
    end
  end

  def test_preferences_should_get_updated
    @preference.save!
    preference_params = {
      preference: {
        site_name: "Spinboi",
        is_password: false,
        password_digest: "admin2"
      }
    }
    put preference_path(@preference.id.to_i), params: preference_params, headers: headers
    assert_response :success
  end
end
