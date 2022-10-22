# frozen_string_literal: true

class LoginController < ApplicationController
  def create
    password = params[:password]
    @preference = Preference.first
    if @preference.is_password
      if @preference.authenticate(password)
        session[:auth] = @preference.authentication_token
        respond_with_login_success(t("login_successful", entity: @preference.site_name))
      else
        respond_with_error(t("incorrect_credentials"))
      end
    end
  end
end
