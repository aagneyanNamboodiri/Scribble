# frozen_string_literal: true

require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization, password_digest: "admin1")
  end

  def test_site_name_shouldnt_be_empty
    @organization.site_name = ""
    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages, "Site name can't be blank"
  end

  def test_is_password_can_be_true_or_false
    @organization.is_password = true
    assert @organization.valid?

    @organization.is_password = false
    assert @organization.valid?
  end

  def test_password_digest_can_be_empty_if_is_password_is_false
    @organization.is_password = false
    @organization.save!
    @organization.password_digest = ""
    assert @organization.valid?
  end

  def test_password_cannot_be_empty_if_is_password_is_true
    @organization.is_password = true
    @organization.save!
    @organization.password_digest = ""
    assert_not @organization.valid?
  end

  def test_password_should_be_atleast_six_characters_long
    @organization.password_digest = "adm1"
    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages, "Password digest is invalid"
  end

  def test_password_needs_one_character_and_one_number
    @organization.password_digest = "adminonly"
    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages, "Password digest is invalid"
  end
end
