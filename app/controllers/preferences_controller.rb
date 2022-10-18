# frozen_string_literal: true

class PreferencesController < ApplicationController
  before_action :load_preference, only: %i[index update]

  def index
  end

  def update
    if !changes_to_password_or_to_password_protection
      session[:auth] = nil
    end
    @preference.update!(preference_params)
    respond_with_success(t("successfully_updated", entity: "Settings"))
  end

  private

    def load_preference
      @preference = Preference.first
    end

    def preference_params
      params.require(:preference).permit([:site_name, :is_password, :password_digest])
    end

    def changes_to_password_or_to_password_protection
      new_password_protection = params[:preference]["is_password"]
      new_password_value = params[:preference]["password_digest"]
      changes = new_password_protection == @preference.is_password && new_password_value == @preference.password_digest
    end
end
