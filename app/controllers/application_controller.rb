# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include ApiResponders
  include ApiRescuable
  include ActionView::Helpers::TranslationHelper
  protect_from_forgery with: :null_session

  before_action :set_paper_trail_whodunnit

  private

    def current_user
      @_current_user ||= User.first
    end

    def current_organization
      @_current_organization ||= Organization.first
    end
end
