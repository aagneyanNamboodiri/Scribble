# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiRescuable
  include ActionView::Helpers::TranslationHelper
  protect_from_forgery with: :null_session

  private

    def current_user
      @_current_user ||= User.first
    end
end
