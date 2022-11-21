# frozen_string_literal: true

class Api::CategoriesController < ApplicationController
  before_action :load_category!, except: %i[index create]

  def index
    @categories = current_user.categories.all.order(position: :asc)
  end

  def create
    category = current_user.categories.create!(category_params)
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def destroy
    DeleteCategoryService.new(params[:id], params[:new_category], current_user).process
    respond_with_success(t("successfully_destroyed", entity: "Category"))
  end

  def update
    @category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  def reorder
    @category.update!(position: params[:position])
  end

  private

    def load_category!
      @category = current_user.categories.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:name)
    end
end
