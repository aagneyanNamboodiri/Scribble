# frozen_string_literal: true

require "test_helper"

class ReportDownloadChannelTest < ActionCable::Channel::TestCase
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
  end

  def test_subscribed
    subscribe
    assert subscription.confirmed?
    assert_has_stream @user.id
    unsubscribe
  end
end
