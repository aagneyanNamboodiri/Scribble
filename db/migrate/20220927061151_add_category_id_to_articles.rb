# frozen_string_literal: true

class AddCategoryIdToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :assigned_category_id, :integer
  end
end
