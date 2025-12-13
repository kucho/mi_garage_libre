# frozen_string_literal: true

class CreateGarageListItems < ActiveRecord::Migration[8.1]
  def change
    create_table(:garage_list_items) do |t|
      t.references(:list, null: false, foreign_key: { to_table: "garage_lists" })
      t.references(:creator, null: false, foreign_key: { to_table: "profiles" })
      t.string(:title)
      t.text(:description)
      t.string(:state)

      t.timestamps
    end
  end
end
