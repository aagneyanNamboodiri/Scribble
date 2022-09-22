# frozen_string_literal: true

class MakeTitleAndBodyNotNullable < ActiveRecord::Migration[6.1]
  def change
    change_column_null :articles, :title, false
    change_column_null :articles, :body, false
  end
end
