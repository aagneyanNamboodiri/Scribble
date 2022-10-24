# frozen_string_literal: true

class AssignReferenceToCategories < ActiveRecord::Migration[6.1]
  def change
    add_reference :categories, :user, foreign_key: true, type: :uuid
  end
end
