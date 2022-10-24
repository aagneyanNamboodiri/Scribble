# frozen_string_literal: true

class AssignReferenceToUser < ActiveRecord::Migration[6.1]
  def change
    add_reference :users, :organization, foreign_key: true, type: :uuid
  end
end
