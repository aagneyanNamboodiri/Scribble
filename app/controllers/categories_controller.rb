# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, except: %i[index]

  def index
    @categories = Category.all
  end

  def create
    category = Category.new(category_params)
    category.save!
    respond_with_success("Category was successfully created")
  end

  def destroy
    @category.destroy!
    respond_with_success("Category was successfully deleted!")
  end

  def update
    @category.update!(category_params)
    respond_with_success("Category was successfully updated!")
  end

  private

    def load_category!
      @category = Category.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:name)
    end
end
