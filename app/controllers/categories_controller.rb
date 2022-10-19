# frozen_string_literal: true

class CategoriesController < ApplicationController
  include CategorySwitchable
  before_action :load_category!, except: %i[index create]
  def index
    @categories = Category.all.order(position: :asc)
  end

  def create
    category = Category.new(category_params)
    category.save!
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def destroy
    switch_article_category(params[:id], params[:new_category])
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
      @category = Category.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:name)
    end

    def reorder_positions
      params.require(:reorder).permit(:positions)
    end
end
