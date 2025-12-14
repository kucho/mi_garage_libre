# frozen_string_literal: true

module Garage
  class ListItemsController < InertiaController
    before_action :set_list
    before_action :set_item, only: [:update]

    def create
      item = @list.items.build(item_params)
      item.creator = Current.profile

      if item.save
        redirect_to(garage_list_url(@list))
      else
        redirect_to(garage_list_url(@list), inertia: { errors: item.errors })
      end
    end

    def update
      if @item.update(item_params)
        redirect_to(garage_list_url(@list))
      else
        redirect_to(garage_list_url(@list), inertia: { errors: @item.errors })
      end
    end

    private

    def set_list
      @list = Current.profile.garage_lists.find(params[:list_id])
    end

    def set_item
      @item = @list.items.find(params[:id])
    end

    def item_params
      params.require(:item).permit(:title, :description, :description_plain)
    end
  end
end
