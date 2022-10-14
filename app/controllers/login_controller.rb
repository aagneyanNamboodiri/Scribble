# frozen_string_literal: true

class LoginController < ApplicationController
  def create
    password = params[:password]
    @preference = Preference.first
    if @preference.authenticate(password)
      cookies[:auth] = @preference.authentication_token
      respond_with_success("Login successful", :created)
    else
      cookies[:auth] = ""
      respond_with_error("Incorrect credentials, try again.", :unauthorized)
    end
  end
end
