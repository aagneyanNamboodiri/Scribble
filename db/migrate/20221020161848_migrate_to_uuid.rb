# frozen_string_literal: true

class MigrateToUuid < ActiveRecord::Migration[6.1]
  def change
    add_column :articles, :uuid, :uuid, null: false, default: -> { "gen_random_uuid()" }
    add_column :categories, :uuid, :uuid, null: false, default: -> { "gen_random_uuid()" }
    add_column :redirections, :uuid, :uuid, null: false, default: -> { "gen_random_uuid()" }
    add_column :preferences, :uuid, :uuid, null: false, default: -> { "gen_random_uuid()" }
    add_column :users, :uuid, :uuid, null: false, default: -> { "gen_random_uuid()" }

    add_column :articles, :user_uuid, :uuid
    add_column :articles, :category_uuid, :uuid

    execute <<-SQL
      UPDATE articles SET user_uuid = users.uuid
      FROM users WHERE articles.user_id = users.id;
    SQL
    execute <<-SQL
      UPDATE articles SET category_uuid = categories.uuid
      FROM categories WHERE articles.assigned_category_id = categories.id;
    SQL

    change_column_null :articles, :user_uuid, false
    remove_column :articles, :user_id
    rename_column :articles, :user_uuid, :user_id

    change_column_null :articles, :category_uuid, false
    remove_column :articles, :assigned_category_id
    rename_column :articles, :category_uuid, :assigned_category_id

    remove_column :users, :id
    remove_column :articles, :id
    remove_column :redirections, :id
    remove_column :categories, :id
    remove_column :preferences, :id

    rename_column :users, :uuid, :id
    rename_column :articles, :uuid, :id
    rename_column :categories, :uuid, :id
    rename_column :preferences, :uuid, :id
    rename_column :redirections, :uuid, :id
  end
end
