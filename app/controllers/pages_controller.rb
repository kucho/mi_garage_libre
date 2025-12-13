# frozen_string_literal: true

class PagesController < ApplicationController
  def landing
    render(inertia: {})
  end
end
