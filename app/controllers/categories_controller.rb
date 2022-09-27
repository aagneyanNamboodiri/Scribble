# frozen_string_literal: true

class CategoriesController < ApplicationController
  def index
    @categories = Category.all
  end

  def create
    category = Category.new(category_params)
    category.save!
    respond_with_success("Article was successfully created")
  end

  private

    def category_params
      params.require(:category).permit(:name)
    end
end
