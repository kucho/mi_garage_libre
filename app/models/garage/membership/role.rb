# frozen_string_literal: true

module Garage::Membership::Role
  extend ActiveSupport::Concern

  included do
    enum :role, [:owner, :admin, :contributor].index_by(&:itself), scopes: false

    scope :owner, -> { where(active: true, role: :owner) }
    scope :admin, -> { where(active: true, role: [:owner, :admin]) }
    scope :contributor, -> { where(active: true, role: :contributor) }
    scope :active, -> { where(active: true, role: [:owner, :admin, :contributor]) }

    def admin?
      super || owner?
    end
  end
end
