# frozen_string_literal: true

module Garage
  class ListItemsController < InertiaController
    before_action :authenticate
    before_action :set_list
    before_action :set_item, only: [:update, :destroy]

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

    def destroy
      @item.destroy
      redirect_to(garage_list_url(@list))
    end

    private

    def set_list
      @list = Garage::List.accessible_by(Current.profile).find(params[:list_id])
    end

    def set_item
      @item = @list.items.find(params[:id])
    end

    def item_params
      params.require(:item).permit(:title, :description, :description_plain)
    end
  end
end
