# frozen_string_literal: true

class AssignReferenceToRedirections < ActiveRecord::Migration[6.1]
  def change
    add_reference :redirections, :user, foreign_key: true, type: :uuid
  end
end
