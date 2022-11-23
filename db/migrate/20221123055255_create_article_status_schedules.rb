# frozen_string_literal: true

class CreateArticleStatusSchedules < ActiveRecord::Migration[6.1]
  def change
    create_table :article_status_schedules, id: :uuid do |t|
      t.string :status
      t.timestamp :schedule_time
      t.timestamps
    end
  end
end
