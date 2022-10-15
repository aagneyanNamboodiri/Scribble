# frozen_string_literal: true

class LoginController < ApplicationController
  def create
    password = params[:password]
    @preference = Preference.first
    if @preference.is_password
      if @preference.password_digest == password
        session[:auth] = @preference.authentication_token
        respond_with_success("Login successful", :created)
      else
        respond_with_error("Incorrect credentials, try again.")
      end
    end
  end
end
