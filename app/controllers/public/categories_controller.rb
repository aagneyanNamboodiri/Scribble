# frozen_string_literal: true

class Public::CategoriesController < Public::BaseController
  before_action :check_if_user_is_authorized
  def index
    @categories = Category.all.order(position: :asc)
  end
end
