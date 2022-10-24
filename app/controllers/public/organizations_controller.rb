# frozen_string_literal: true

class Public::OrganizationsController < Public::BaseController
  before_action :check_if_user_is_authorized
  def index
    @organization = Organization.first
  end
end
