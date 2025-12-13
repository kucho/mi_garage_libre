# frozen_string_literal: true

class CreateProfiles < ActiveRecord::Migration[8.1]
  def change
    create_table(:profiles) do |t|
      t.references(:account, null: false, foreign_key: true)
      t.string(:handle)
      t.string(:first_name)
      t.string(:last_name)

      t.timestamps
    end
  end
end
