# frozen_string_literal: true

class LoginController < ApplicationController
  def create
    password = params[:password]
    @preference = Preference.first
    unless @preference.authenticate(password)
      byebug
      respond_with_error("Incorrect credentials, try again.", :unauthorized)
    end
  end
end