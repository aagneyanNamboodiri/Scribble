# frozen_string_literal: true

require "test_helper"

class ArticleStatusScheduleTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @article = build(:article, assigned_category: @category, user: @user, status: "published")
    @article_schedule = build(:article_status_schedule, article: @article)
  end

  def test_scheduled_time_cannot_be_in_the_past
  end
end
