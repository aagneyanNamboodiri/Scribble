# frozen_string_literal: true

class CreateArticleStatusSchedules < ActiveRecord::Migration[6.1]
  def change
    create_table :article_status_schedules, id: :uuid do |t|
      t.string :article_status
      t.timestamp :scheduled_time
      t.string :schedule_status, default: :pending
      t.timestamps
    end
  end
end
