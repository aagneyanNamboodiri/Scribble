# frozen_string_literal: true

class PreferencesController < ApplicationController
  before_action :load_preference, only: %i[index update]

  def index
  end

  def update
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
end