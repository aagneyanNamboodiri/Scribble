# frozen_string_literal: true

class Public::CategoriesController < ApplicationController
  def index
    @categories = Category.all.order(position: :asc)
  end
end
