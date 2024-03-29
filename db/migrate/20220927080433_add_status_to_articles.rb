# frozen_string_literal: true

class AddStatusToArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :status, :string, default: "draft", null: false
  end
end
