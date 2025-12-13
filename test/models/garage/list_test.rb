# frozen_string_literal: true

require "test_helper"

module Garage
  class ListTest < ActiveSupport::TestCase
    test "associations" do
      list = garage_lists(:doggy_stuff)
      expect(list.owner.garage_lists).must_include(list)
    end
  end
end
