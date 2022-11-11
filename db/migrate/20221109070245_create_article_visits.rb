# frozen_string_literal: true

class CreateArticleVisits < ActiveRecord::Migration[6.1]
  def change
    create_table :article_visits, id: :uuid do |t|
      t.date :visit_date
      t.timestamps
    end
  end
end
