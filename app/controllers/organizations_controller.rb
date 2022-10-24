# frozen_string_literal: true

class OrganizationsController < ApplicationController
  before_action :load_organization, only: %i[index update]

  def index
  end

  def update
    if changes_to_password_logistics
      session[:auth] = nil
    end
    @organization.update!(organization_params)
    respond_with_success(t("successfully_updated", entity: "Settings"))
  end

  private

    def load_organization
      @organization = Organization.first
    end

    def organization_params
      params.require(:organization).permit([:site_name, :is_password, :password])
    end

    def changes_to_password_logistics
      new_password_protection = params[:organization]["is_password"]
      new_password_value = params[:organization]["password"]
      changes = !(new_password_protection == @organization.is_password &&
        @organization.authenticate(new_password_value))
    end
end
