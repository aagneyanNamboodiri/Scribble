# frozen_string_literal: true

class Public::PreferencesController < Public::BaseController
  before_action :check_if_user_is_authorized
  def index
    @preference = Preference.first
  end
end
