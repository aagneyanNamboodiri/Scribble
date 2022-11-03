# frozen_string_literal: true

class Api::VersionsController < Api::ArticlesController
  before_action :load_article!, only: %i[index show]
  before_action :load_version_by_id!, only: %i[show]

  def index
    @versions_data = @article.versions.drop(1).map { |version|
      load_article_data_per_version(version)
    }
  end

  def show
    @article_by_version_id =
      load_article_data_per_version(@version_by_id)
  end

  private

    def load_article!
      @article = current_user.articles.find(params[:article_id])
    end

    def load_version_by_id!
      @version_by_id = @article.versions.find(params[:id])
    end

    def load_article_data_per_version(version)
      versioned_article = version.reify
      article_data = {
        id: version.id,
        title: versioned_article.title,
        body: versioned_article.body,
        assigned_category: versioned_article.assigned_category,
        status: versioned_article.status,
        time: version.created_at,
        is_restoration: version.event == "restored"
      }
    end
end
