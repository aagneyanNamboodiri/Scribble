# frozen_string_literal: true

class DropFrontendRoutes < ActiveRecord::Migration[6.1]
  def change
    drop_table :frontend_routes
  end
end
