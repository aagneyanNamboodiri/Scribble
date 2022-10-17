# frozen_string_literal: true

require "test_helper"

class PreferencesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @preference = create(:preference)
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
end
