# frozen_string_literal: true

class Public::PreferencesController < ApplicationController
  def index
    @preference = Preference.first
  end
end
