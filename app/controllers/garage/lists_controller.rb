# frozen_string_literal: true

module Garage
  class ListsController < InertiaController
    def index
      lists = Current.profile.garage_lists.includes(:owner, :memberships)

      render(inertia: { lists: ListSerializer.new(lists) })
    end

    def create
      list = Current.profile.garage_lists.build(list_params)

      if list.save
        list.memberships.create!(profile: Current.profile, role: :owner)
        redirect_to(garage_lists_url)
      else
        redirect_to(garage_lists_url, inertia: { errors: list.errors })
      end
    end

    private

    def list_params
      params.require(:list).permit(:name, :description)
    end
  end
end
