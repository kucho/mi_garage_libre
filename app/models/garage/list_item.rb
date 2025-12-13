# frozen_string_literal: true

class Garage::ListItem < ApplicationRecord
  belongs_to :list
  belongs_to :creator, class_name: "Profile", inverse_of: :garage_list_items
end
