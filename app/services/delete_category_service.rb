# frozen_string_literal: true

class DeleteCategoryService
  attr_reader :category_deleted, :current_user, :category_to_switch

  def initialize(category_to_delete, category_to_switch_articles_to, current_user)
    @current_user = current_user
    @category_deleted = category_to_delete
    @category_to_switch = category_to_switch_articles_to
  end

  def process!
    delete_category_service
  end

  private

    def delete_category_service
      if category_deleted == @category_to_switch
        raise ArgumentError.new(I18n.t("invalid_from_category"))
      end

      if current_user.categories.count == 1
        if current_user.categories.first.name == "General"
          raise RuntimeError.new(I18n.t("general_category_cant_be_deleted"))
        else
          @category_to_switch = current_user.categories.create!(name: "General").id
        end
      end
      articles_to_switch_categories =
        current_user.articles.where(assigned_category_id: category_deleted)
      articles_to_switch_categories.each do |article|
        article.update!(assigned_category_id: @category_to_switch)
      end
      current_user.categories.find(category_deleted).destroy!
    end
end
