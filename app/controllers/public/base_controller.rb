# frozen_string_literal: true

class Public::BaseController < ApplicationController
  def check_if_user_is_authorized
    a = cookies[:auth] == Preference.first.authentication_token
    if a == false
      respond_with_error("Not authorized", :unauthorized)
    end
  end
end
