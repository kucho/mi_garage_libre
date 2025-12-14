# frozen_string_literal: true

class AddDescriptionPlainToGarageListItems < ActiveRecord::Migration[8.1]
  def change
    add_column(:garage_list_items, :description_plain, :text)
  end
end
