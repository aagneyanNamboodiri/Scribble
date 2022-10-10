# frozen_string_literal: true

class CreatePreferences < ActiveRecord::Migration[6.1]
  def change
    create_table :preferences do |t|
      t.string :site_name
      t.boolean :is_password, default: false
      t.string :password_digest, null: false
      t.timestamps
    end
  end
end
