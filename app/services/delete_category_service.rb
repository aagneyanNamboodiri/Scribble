# frozen_string_literal: true

class DeleteCategoryService
  def initialize(category_to_be_deleted, category_to_put_articles_to)
    @current_user = User.first
    @category_to_be_deleted = category_to_be_deleted
    @category_to_put_articles_to = category_to_put_articles_to
    if @category_to_be_deleted == @category_to_put_articles_to
      raise Exception.new t("invalid_from_category")
    end
  end

  def process
    delete_category_service
  end

  private

    def delete_category_service
      if @current_user.categories.count == 1
        if @current_user.categories.first.name == "General"
          raise Exception.new "Cannot delete General category if it is the only existing category"
        else
          @category_to_put_articles_to = @current_user.categories.create!(name: "General").id
        end
      end
      articles_to_switch_categories =
        @current_user.articles.where(assigned_category_id: @category_to_be_deleted)
      articles_to_switch_categories.each do |article|
        article.assigned_category_id = @category_to_put_articles_to
        article.save!
      end
      @current_user.categories.find(@category_to_be_deleted).destroy!
    end
end
