# frozen_string_literal: true

require "test_helper"

class PreferenceTest < ActiveSupport::TestCase
  def setup
    @preference = create(:preference, password_digest: "admin1")
  end

  def test_site_name_shouldnt_be_empty
    @preference.site_name = ""
    assert_not @preference.valid?
    assert_includes @preference.errors.full_messages, "Site name can't be blank"
  end

  def test_is_password_can_be_true_or_false
    @preference.is_password = true
    assert @preference.valid?

    @preference.is_password = false
    assert @preference.valid?
  end

  def test_password_digest_can_be_empty_if_is_password_is_false
    @preference.is_password = false
    @preference.save!
    @preference.password_digest = ""
    assert @preference.valid?
  end

  def test_password_cannot_be_empty_if_is_password_is_true
    @preference.is_password = true
    @preference.save!
    @preference.password_digest = ""
    assert_not @preference.valid?
  end

  def test_password_should_be_atleast_six_characters_long
    @preference.password_digest = "adm1"
    assert_not @preference.valid?
    assert_includes @preference.errors.full_messages, "Password digest is invalid"
  end

  def test_password_needs_one_character_and_one_number
    @preference.password_digest = "adminonly"
    assert_not @preference.valid?
    assert_includes @preference.errors.full_messages, "Password digest is invalid"
  end
end
