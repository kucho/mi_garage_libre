# frozen_string_literal: true

module Garage
  class List < ApplicationRecord
    belongs_to :owner, class_name: "Profile", inverse_of: :garage_lists
    has_many :memberships, dependent: :destroy
    has_many :items, class_name: "Garage::ListItem", dependent: :destroy
  end
end
