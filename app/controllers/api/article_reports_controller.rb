# frozen_string_literal: true

class Api::ArticleReportsController < ApplicationController
  def create
    ArticleReportsWorker.perform_async(current_user.id)
    respond_with_success(t("report_generation_in_progress"))
  end

  def download
    unless current_user.report.attached?
      respond_with_error(t("not_found", entity: "report"), :not_found)
    end
    send_data current_user.report.download, filename: pdf_file_name, content_type: "application/pdf"
  end

  private

    def pdf_file_name
      "report.pdf"
    end
end
