# frozen_string_literal: true

class Api::OrganizationsController < ApplicationController
  before_action :load_organization, only: %i[show update]

  def show
    render
  end

  def update
    reset_cookie_if_changes_to_password_logistics

    if organization_params[:is_password].nil?
      @organization.update_attribute(:site_name, params[:organization]["site_name"])
    else
      @organization.update!(organization_params)
    end
    respond_with_success(t("successfully_updated", entity: "Settings"))
  end

  private

    def load_organization
      @organization = Organization.first
    end

    def organization_params
      params.require(:organization).permit([:site_name, :is_password, :password])
    end

    def reset_cookie_if_changes_to_password_logistics
      new_password_protection = params[:organization]["is_password"]
      new_password_value = params[:organization]["password"]
      changes = !(new_password_protection == @organization.is_password &&
        @organization.authenticate(new_password_value))
      if changes
        session[:auth] = nil
      end
    end
end
