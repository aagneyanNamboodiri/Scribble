# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_redirection!, only: %i[destroy update]
  def create
    redirection = current_user.redirections.create!(redirection_params)
    respond_with_success(t("successfully_created", entity: "Redirection"))
  end

  def index
    @redirections = current_user.redirections.all
  end

  def update
    @redirection.update!(redirection_params)
    respond_with_success(t("successfully_updated", entity: "Redirection"))
  end

  def destroy
    @redirection.destroy!
    respond_with_success(t("successfully_destroyed", entity: "Redirection"))
  end

  private

    def redirection_params
      params.require(:redirections).permit([:to_path, :from_path])
    end

    def load_redirection!
      @redirection = current_user.redirections.find(params[:id])
    end
end
