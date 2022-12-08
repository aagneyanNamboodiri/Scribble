# frozen_string_literal: true

class ArticleReportsWorker
  include Sidekiq::Worker

  def perform(user_id, report_path)
    user = User.find(user_id)
    articles = user.articles.where(status: :published)
    content = ApplicationController.render(
      assigns: {
        articles: articles
      },
      template: "articles/article_report/download",
      layout: "pdf"
    )
    pdf_blob = WickedPdf.new.pdf_from_string content
    File.open(report_path, "wb") do |f|
      f.write(pdf_blob)
    end
  end
end
