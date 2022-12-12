# frozen_string_literal: true

require "test_helper"

class ApplicationCable::ConnectionTest < ActionCable::Connection::TestCase
  include FactoryBot::Syntax::Methods

  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
  end

  def test_connection_success
    connect params: { user_id: @user.id }
    assert_equal connection.current_user, @user
  end

  def test_connection_fails_when_user_is_not_verified
    assert_raises ActiveRecord::RecordNotFound do
      connect params: {
        user_id: "invalid user id"
      }
    end
  end

  def test_connection_fails_when_credentials_are_empty
    assert_raises ActiveRecord::RecordNotFound do
      connect params: {}
    end
  end
end
