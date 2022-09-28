# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :load_category!, except: %i[index create]
  def index
    @categories = Category.all
  end

  def create
    category = Category.new(category_params)
    category.save!
    respond_with_success("Category " + t("successfully_created"))
  end

  def destroy
    @new_category = Category.find(params[:new ])
    articles_with_category = Article.where(assigned_category_id: params[:id])
    articles_with_category.each do |article_with_category|
      article_with_category.assigned_category_id = @new_category.id
      article_with_category.save!
    end
    @category.destroy!
    respond_with_success("Category " + t("successfully_destroyed"))
  end

  def update
    @category.update!(category_params)
    respond_with_success("Category " + t("successfully_updated"))
  end

  private

    def load_category!
      @category = Category.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:name)
    end
end
