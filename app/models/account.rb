# frozen_string_literal: true

class Account < ApplicationRecord
  include Rodauth::Rails.model

  enum :status, [:unverified, :verified, :closed].index_by(&:itself), default: :unverified
end
