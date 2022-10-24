# frozen_string_literal: true

class LoginController < ApplicationController
  def create
    password = params[:password]
    @organization = Organization.first
    if @organization.is_password
      if @organization.authenticate(password)
        session[:auth] = @organization.authentication_token
        respond_with_login_success(t("login_successful", entity: @organization.site_name))
      else
        respond_with_error(t("incorrect_credentials"))
      end
    end
  end
end
