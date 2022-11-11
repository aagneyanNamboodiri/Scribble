# frozen_string_literal: true

class AddForeginKeyToArticleVisits < ActiveRecord::Migration[6.1]
  def change
    add_reference :article_visits, :article, foreign_key: true, type: :uuid
  end
end
