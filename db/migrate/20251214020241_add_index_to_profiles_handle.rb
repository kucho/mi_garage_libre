# frozen_string_literal: true

class AddIndexToProfilesHandle < ActiveRecord::Migration[8.1]
  def change
    add_index(:profiles, :handle, unique: true, where: "handle IS NOT NULL")
  end
end
