# frozen_string_literal: true

class PreferencesController < ApplicationController
  before_action :load_preference, only: %i[index update]

  def index
  end

  def update
    if changes_to_password_logistics
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
      params.require(:preference).permit([:site_name, :is_password, :password])
    end

    def changes_to_password_logistics
      new_password_protection = params[:preference]["is_password"]
      new_password_value = params[:preference]["password"]
      changes = !(new_password_protection == @preference.is_password &&
        @preference.authenticate(new_password_value))
    end
end
