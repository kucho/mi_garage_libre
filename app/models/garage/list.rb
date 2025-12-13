# frozen_string_literal: true

module Garage
  class List < ApplicationRecord
    belongs_to :owner, class_name: "Profile", inverse_of: :garage_lists
    has_many :memberships, dependent: :destroy
  end
end
