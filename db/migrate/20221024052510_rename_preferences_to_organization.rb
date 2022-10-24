# frozen_string_literal: true

class RenamePreferencesToOrganization < ActiveRecord::Migration[6.1]
  def change
    rename_table :preferences, :organizations
  end
end
