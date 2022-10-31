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
      article_data = {
        id: version.id,
        title: version.object[/#{"title: "}(.*?)#{"\n"}/m, 1],
        body: version.object[/#{"body: "}(.*?)#{"\nassigned"}/m, 1],
        assigned_category_id: version.object[/#{"assigned_category_id: "}(.*?)#{"\n"}/m, 1],
        status: version.object[/#{"status: "}(.*?)#{"\n"}/m, 1],
        time: version.created_at,
        is_restoration: version.event == "restored"
      }
    end
end
