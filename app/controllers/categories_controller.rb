# frozen_string_literal: true

class CategoriesController < ApplicationController
  include CategorySwitchable
  before_action :load_category!, except: %i[index create]
  def index
    @categories = Category.all
  end

  def create
    category = Category.new(category_params)
    category.save!
    respond_with_success(t("successfully_created", entity: "Category"))
  end

  def destroy
    if params[:new_category] != -1
      switch_article_category(params[:id], params[:new_category])
    end
    @category.destroy!
    respond_with_success(t("successfully_destroyed", entity: "Category"))
  end

  def update
    @category.update!(category_params)
    respond_with_success(t("successfully_updated", entity: "Category"))
  end

  private

    def load_category!
      @category = Category.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:name)
    end
end
