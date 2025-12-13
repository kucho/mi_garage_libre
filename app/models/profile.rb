# frozen_string_literal: true

class Profile < ApplicationRecord
  belongs_to :account
  has_many :garage_lists, class_name: "Garage::List", dependent: :destroy, inverse_of: :owner
end
