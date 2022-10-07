# frozen_string_literal: true

module CategorySwitchable
  extend ActiveSupport::Concern

  def switch_article_category (from_category, to_category)
    if to_category === "-2"
      to_category = Category.create!(name: "General").id
    end
    articles_with_from_category = Article.where(assigned_category_id: from_category)
    articles_with_from_category.each do |article|
      article.assigned_category_id = to_category
      article.save!
    end
  end
end
