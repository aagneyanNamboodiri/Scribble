# frozen_string_literal: true

class LoginController < ApplicationController
  def create
    password = params[:password]
    if current_organization.is_password
      if current_organization.authenticate(password)
        session[:auth] = current_organization.authentication_token
        respond_with_login_success(t("login_successful", entity: current_organization.site_name))
      else
        respond_with_error(t("incorrect_credentials"))
      end
    end
  end
end
