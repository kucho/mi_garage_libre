# frozen_string_literal: true

module Garage
  class ListItemSerializer < ApplicationSerializer
    attributes :id, :title, :description, :state, :created_at

    one :creator, serializer: ProfileSerializer
  end
end
