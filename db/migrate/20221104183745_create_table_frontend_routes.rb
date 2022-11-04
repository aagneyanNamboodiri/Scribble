# frozen_string_literal: true

class CreateTableFrontendRoutes < ActiveRecord::Migration[6.1]
  def change
    create_table :frontend_routes do |t|
      t.text :route
      t.timestamps
    end
  end
end
