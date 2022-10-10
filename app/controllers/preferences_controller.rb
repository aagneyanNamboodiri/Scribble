# frozen_string_literal: true

class PreferencesController < ApplicationController
  def index
    @preference = Preference.first
  end
end
