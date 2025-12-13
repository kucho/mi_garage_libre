# frozen_string_literal: true

class CreateGarageMemberships < ActiveRecord::Migration[8.1]
  def change
    create_table(:garage_memberships) do |t|
      t.references(:list, null: false, foreign_key: { to_table: "garage_lists" })
      t.references(:profile, null: false, foreign_key: true)
      t.string(:role, null: false, default: "contributor")
      t.boolean(:active, null: false, default: true)

      t.timestamps
    end
  end
end
