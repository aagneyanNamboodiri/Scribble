# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :redirection_method
  def index
    render
  end

  def redirection_method
    redirection_input = Redirection.find_by(from_path: request.path)
    redirect_to redirection_input.to_path, status: 301 unless redirection_input.nil?
  end
end
