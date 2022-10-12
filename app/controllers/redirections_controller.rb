# frozen_string_literal: true

class RedirectionsController < ApplicationController
  before_action :load_redirection!, only: %i[destroy update]
  def create
    redirection = Redirection.new(redirection_params)
    redirection.save!
    respond_with_success(t("successfully_created", entity: "Redirection"))
  end

  def index
    @redirections = Redirection.all
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
      params.require(:redirection).permit([:to_path, :from_path])
    end

    def load_redirection!
      @redirection = Redirection.find(params[:id])
    end
end
