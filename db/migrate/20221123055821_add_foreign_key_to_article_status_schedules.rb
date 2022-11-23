# frozen_string_literal: true

class AddForeignKeyToArticleStatusSchedules < ActiveRecord::Migration[6.1]
  def change
    add_reference :article_status_schedules, :article, foreign_key: true, type: :uuid
  end
end
