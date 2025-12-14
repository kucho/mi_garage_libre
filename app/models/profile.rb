# frozen_string_literal: true

class Profile < ApplicationRecord
  HANDLE_FORMAT = /\A[a-zA-Z][a-zA-Z0-9]*\z/

  belongs_to :account
  has_many :garage_lists, class_name: "Garage::List", dependent: :destroy, inverse_of: :owner
  has_many :garage_list_items, class_name: "Garage::ListItem", dependent: :destroy, inverse_of: :creator
  has_many :garage_memberships, class_name: "Garage::Membership", dependent: :destroy

  validates :handle,
    uniqueness: { case_sensitive: false },
    length: { minimum: 3 },
    format: { with: HANDLE_FORMAT, message: "must start with a letter and contain only letters and numbers" },
    allow_blank: true
end
