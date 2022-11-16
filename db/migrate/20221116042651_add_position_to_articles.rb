# frozen_string_literal: true

class AddPositionToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :position, :integer
    Category.all.each do |category|
      category.articles.order(:updated_at).each.with_index(1) do |article, index|
        article.update_column :position, index
      end
    end
  end
end
