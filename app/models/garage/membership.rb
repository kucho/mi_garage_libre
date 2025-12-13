# frozen_string_literal: true

module Garage
  class Membership < ApplicationRecord
    include Role

    belongs_to :list
    belongs_to :profile

    def deactivate
      update!(active: false)
    end
  end
end
