# frozen_string_literal: true

class Public::BaseController < ApplicationController
  def check_if_user_is_authorized
    preference = Preference.first
    a = cookies[:auth] == preference.authentication_token
    byebug
    if a == false && preference.is_password
      respond_with_error("Not authorized", :unauthorized)
    end
  end
end
