# frozen_string_literal: true

class AddPositionToCategory < ActiveRecord::Migration[6.1]
  def change
    add_column :categories, :position, :integer
    Category.order(:updated_at).each.with_index(1) do |category, index|
      category.update_column :position, index
    end
  end
end
