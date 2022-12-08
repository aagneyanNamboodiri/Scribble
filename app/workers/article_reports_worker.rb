# frozen_string_literal: true

class ArticleReportsWorker
  include Sidekiq::Worker

  def perform(user_id)
    user = User.find(user_id)
    articles = user.articles.where(status: :published)
    html_report = ApplicationController.render(
      assigns: {
        articles: articles
      },
      template: "articles/article_report/download",
      layout: "pdf"
    )
    pdf_report = WickedPdf.new.pdf_from_string html_report
    if user.report.attached?
      user.report.purge_later
    end
    user.report.attach(
      io: StringIO.new(pdf_report), filename: "report.pdf",
      content_type: "application/pdf")
    user.save!
  end
end
