# frozen_string_literal: true

class ProfileSerializer < ApplicationSerializer
  attributes :id, :first_name, :last_name, :handle

  one :account
end
