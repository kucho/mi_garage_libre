# frozen_string_literal: true

class PagesController < InertiaController
  def landing
    render(inertia: {})
  end
end
