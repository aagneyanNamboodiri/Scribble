# frozen_string_literal: true

class AddRestorationDateToVersions < ActiveRecord::Migration[6.1]
  def change
    add_column :versions, :restored_from, :integer
  end
end
