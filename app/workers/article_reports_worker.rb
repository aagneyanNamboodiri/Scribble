# frozen_string_literal: true

class ArticleReportsWorker
  include Sidekiq::Worker
  include ActionView::Helpers::TranslationHelper

  def perform(user_id)
    ActionCable.server.broadcast(user_id, { message: t("report.render"), progress: 25 })
    user = User.find(user_id)
    articles = user.articles.where(status: :published)
    html_report = ApplicationController.render(
      assigns: {
        articles: articles
      },
      template: "articles/article_report/download",
      layout: "pdf"
    )
    ActionCable.server.broadcast(user_id, { message: t("report.generate"), progress: 50 })
    pdf_report = WickedPdf.new.pdf_from_string html_report
    ActionCable.server.broadcast(user_id, { message: t("report.upload"), progress: 75 })
    if user.report.attached?
      user.report.purge_later
    end
    user.report.attach(
      io: StringIO.new(pdf_report), filename: "report.pdf",
      content_type: "application/pdf")
    user.save
    ActionCable.server.broadcast(user_id, { message: t("report.attach"), progress: 100 })
  end
end
