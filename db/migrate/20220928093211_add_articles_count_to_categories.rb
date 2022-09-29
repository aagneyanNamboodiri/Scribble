# frozen_string_literal: true

class AddArticlesCountToCategories < ActiveRecord::Migration[6.1]
  def change
    add_column :categories, :articles_count, :integer
  end
end
