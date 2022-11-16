# frozen_string_literal: true

class Api::CategoriesController < ApplicationController
  before_action :load_category!, except: %i[index create]
  before_action :set_to_category, only: %i[delete]

  def index
    @categories = current_user.categories.all.order(position: :asc)
  end

  def create
    category = current_user.categories.create!(category_params)
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def destroy
    SwitchArticlesToNewCategoryService.new(@category.articles.ids, @to_category).process
    @category.destroy!
    respond_with_success(t("successfully_destroyed", entity: "Category"))
  end

  def update
    @category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  def reorder
    movement_direction = reorder_positions[:positions].to_i
    moves = movement_direction.abs()
    while moves > 0
      movement_direction < 0 ? @category.move_lower : @category.move_higher
      moves -= 1
    end
  end

  private

    def load_category!
      @category = current_user.categories.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:name)
    end

    def reorder_positions
      params.require(:reorder).permit(:positions)
    end

    def set_to_category
      @to_category = params[:new_category]
      if @current_user.categories.count == 1
        @to_category = @current_user.categories.create!(name: "General").id
      end
    end
end
