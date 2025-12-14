# frozen_string_literal: true

module Garage
  class ListSerializer < ApplicationSerializer
    attributes :id, :name, :description, :created_at

    one :owner, serializer: ProfileSerializer

    typelize "number"
    attribute :members_count do |list|
      list.memberships.active.count
    end
  end
end
