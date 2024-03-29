# frozen_string_literal: true

class Api::ArticleReportsController < ApplicationController
  def create
    ArticleReportsWorker.perform_async(current_user.id)
  end

  def download
    unless current_user.report.attached?
      respond_with_error(t("not_found", entity: "report"), :not_found)
    else
      send_data current_user.report.download, filename: pdf_file_name, content_type: "application/pdf"
    end
  end

  private

    def pdf_file_name
      "report.pdf"
    end
end
