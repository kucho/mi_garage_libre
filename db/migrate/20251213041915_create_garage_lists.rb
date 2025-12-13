# frozen_string_literal: true

class CreateGarageLists < ActiveRecord::Migration[8.1]
  def change
    create_table(:garage_lists) do |t|
      t.string(:name, null: false)
      t.text(:description)
      t.references(:owner, null: false, foreign_key: { to_table: :profiles })

      t.timestamps
    end
  end
end
