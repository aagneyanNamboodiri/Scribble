# frozen_string_literal: true

class AddVisitsToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :visits, :integer, null: false, default: 0
  end
end
