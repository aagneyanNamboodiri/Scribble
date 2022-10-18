# frozen_string_literal: true

require "test_helper"

class RedirctionTest < ActiveSupport::TestCase
  def setup
    @redirection = create(:redirection, from_path: "/something", to_path: "/another_thing")
  end

  def test_from_path_should_not_be_empty
    @redirection.from_path = ""
    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "From path can't be blank"
  end

  def test_to_path_should_not_be_empty
    @redirection.to_path = ""
    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "To path can't be blank"
  end

  def test_paths_should_start_with_a_backslash
    @redirection.from_path = "linkinpark"
    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "From path is invalid"

    @redirection.to_path = "linkinpark"
    assert_not @redirection.valid?
    assert_includes @redirection.errors.full_messages, "To path is invalid"
  end
end
