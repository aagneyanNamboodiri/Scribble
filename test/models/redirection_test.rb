# frozen_string_literal: true

require "test_helper"

class RedirctionTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @redirection = create(:redirection, from_path: "something", to_path: "another", user: @user)
    @redirection_two = build(
      :redirection, from_path: @redirection.to_path,
      to_path: @redirection.from_path, user: @user)
  end

  def test_from_path_should_not_be_empty
    @redirection.from_path = ""
    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "From path can't be blank"
  end

  def test_to_path_should_not_be_empty
    @redirection.to_path = ""
    assert_not @redirection.valid?
    assert_includes "To path can't be blank", @redirection.errors.full_messages[1]
  end

  def test_paths_shouldnt_start_with_a_backslash
    @redirection.from_path = "/linkinpark"
    assert_not @redirection.valid?
    assert_includes "From path is invalid", @redirection.errors.full_messages[0]

    @redirection.to_path = "/linkinpark"
    assert_not @redirection.valid?
    assert_includes "To path is invalid", @redirection.errors.full_messages[1]
  end

  def test_from_path_cannot_be_to_path
    @redirection.from_path = "linkinpark"
    @redirection.to_path = "linkinpark"
    assert_not @redirection.valid?
    assert_includes "From path cannot be the to path", @redirection.errors.full_messages[0]
  end

  def test_redirection_cannot_form_loops
    @redirection.save!
    assert_not @redirection_two.valid?
    assert_includes "This redirection forms a loop. Please change the "\
    "redirection. Loop path : another->something->another",
      @redirection_two.errors.full_messages[0]
  end

  def test_redirection_from_path_cannot_be_app_frontend_route
    FrontendRoute.create!(route: "settings")
    @redirection_two.from_path = "settings"
    assert_not @redirection_two.valid?
    assert_includes "This FROM PATH cannot be used.", @redirection_two.errors.full_messages[0]
  end
end
