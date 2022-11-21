# frozen_string_literal: true

class SwitchArticlesToNewCategoryService
  attr_reader :article_ids, :current_user, :to_category

  def initialize(article_ids, to_category_id, current_user)
    @current_user = current_user
    @article_ids = article_ids
    @to_category = to_category_id
    if @current_user.articles.find(article_ids[0]).assigned_category_id == @to_category
      raise ArgumentError.new(I18n.t("invalid_from_category"))
    end
  end

  def process!
    switch_articles_to_new_category_service
  end

  private

    def switch_articles_to_new_category_service
      article_ids.each do |article_id|
        article = current_user.articles.find(article_id)
        article.assigned_category_id = to_category
        article.save!
      end
    end
end
