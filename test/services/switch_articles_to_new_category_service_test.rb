# frozen_string_literal: true

require "test_helper"

class SwitchArticlesToNewCategoryServiceTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization, is_password: false)
    @user = create(:user, organization: @organization)
    @category = create(:category, user: @user)
    @category_2 = create(:category, user: @user)
    @article = build(:article, user: @user, assigned_category: @category)
    @headers = headers()
  end
end
