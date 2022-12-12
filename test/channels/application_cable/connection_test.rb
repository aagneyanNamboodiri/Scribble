# frozen_string_literal: true

require "test_helper"

class ApplicationCable::ConnectionTest < ActionCable::Connection::TestCase
  include FactoryBot::Syntax::Methods

  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
  end

  def test_connection_success
    connect params: {}
    assert_equal connection.current_user, @user
  end
end
