# frozen_string_literal: true

require "test_helper"

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @organization = build(:organization, is_password: true, password: "admin1")
  end

  def test_site_name_shouldnt_be_empty
    @organization.site_name = ""
    assert_not @organization.valid?
    assert_includes "Site name can't be blank", @organization.errors.full_messages[0]
  end

  def test_organization_name_should_have_atleast_one_alphanumeric
    @organization.site_name = "-_-"
    assert_not @organization.valid?
    assert_includes "Site name is invalid", @organization.errors.full_messages[0]
  end

  def test_is_password_can_be_true_or_false
    @organization.is_password = true
    assert @organization.valid?

    @organization.is_password = false
    assert @organization.valid?
  end

  def test_password_can_be_empty_if_is_password_is_false
    @organization.is_password = false
    @organization.save!
    @organization.password = ""
    assert @organization.valid?
  end

  def test_password_cannot_be_invalid_if_is_password_is_true
    @organization.is_password = true
    @organization.password = "pwd12"
    @organization.password_confirmation = "pwd12"

    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages[0], "Password is invalid"
  end

  def test_password_should_be_atleast_six_characters_long
    @organization.password = "adm1"
    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages[0], "Password is invalid"
  end

  def test_password_needs_one_character_and_one_number
    @organization.password = "adminonly"
    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages[0], "Password is invalid"

    @organization.password = "12345678"
    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages[0], "Password is invalid"
  end
end
