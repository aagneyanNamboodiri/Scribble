# frozen_string_literal: true

class CategoriesController < ApplicationController
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
    articles_with_deletion_category = Article.where(assigned_category_id: params[:id])
    if Category.count == 1
      Category.create!(params[:new_cat])
    end

    if params[:new] != nil
      new_category = Category.find(params[:new])
      articles_with_deletion_category.each do |article|
        article.assigned_category_id = new_category.id
        article.save!
      end
    end

    @category.destroy!
    respond_with_success(t("successfully_destroyed", entity: "Category")
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
