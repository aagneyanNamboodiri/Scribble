# frozen_string_literal: true

class SwitchArticlesToNewCategoryService
  def initialize(category_id, to_category_id)
    @from_category = category_id
    @to_category = to_category_id
    if @from_category == @to_category
      raise Exception.new "From category cannot be the to category"
    end
  end

  def process
    switch_articles_to_new_category
  end

  private

    def switch_articles_to_new_category
      if Category.count == 1
        @to_category = Category.create!(name: "General").id
      end
      articles_with_from_category = Article.where(assigned_category_id: @from_category)
      articles_with_from_category.each do |article|
        article.assigned_category_id = @to_category
        article.save!
      end
    end
end
