# frozen_string_literal: true

class Public::BaseController < ApplicationController
  def check_if_user_is_authorized
    preference = Preference.first
    is_auth_token_set = session[:auth] == preference.authentication_token
    if !is_auth_token_set && preference.is_password
      respond_with_error("Not authorized", :unauthorized)
    end
  end
end
