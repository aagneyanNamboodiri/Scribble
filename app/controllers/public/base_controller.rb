# frozen_string_literal: true

class Public::BaseController < ApplicationController
  def check_if_user_is_authorized
    organization = Organization.first
    is_auth_token_set = session[:auth] == organization.authentication_token
    if !is_auth_token_set && organization.is_password
      respond_with_error("Not authorized", :unauthorized)
    end
  end
end
