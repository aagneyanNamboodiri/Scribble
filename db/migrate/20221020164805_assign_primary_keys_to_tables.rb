# frozen_string_literal: true

class AssignPrimaryKeysToTables < ActiveRecord::Migration[6.1]
  def change
    execute "ALTER TABLE users ADD PRIMARY KEY (id);"
    execute "ALTER TABLE categories ADD PRIMARY KEY (id);"
    execute "ALTER TABLE articles ADD PRIMARY KEY (id);"
    execute "ALTER TABLE preferences ADD PRIMARY KEY (id);"
    execute "ALTER TABLE redirections ADD PRIMARY KEY (id);"
  end
end
