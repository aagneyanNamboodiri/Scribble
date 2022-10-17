# frozen_string_literal: true

require "test_helper"

class PreferencesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @preference = create(:preference)
  end

  def test_site_name_shouldnt_be_empty
    @preference.site_name = ""
    assert_raises ActiveRecord::RecordInvalid do
      @preference.save!
    end
  end
end
