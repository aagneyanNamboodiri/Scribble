# frozen_string_literal: true

class RemoveVisitsFromArticles < ActiveRecord::Migration[6.1]
  def change
    remove_column :articles, :visits
  end
end
