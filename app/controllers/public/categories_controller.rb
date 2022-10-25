# frozen_string_literal: true

class Public::CategoriesController < Public::BaseController
  before_action :check_if_user_is_authorized
  def index
    all_categories = current_user.categories.order(position: :asc)
    @categories = all_categories.select { |category| category.articles.published.count > 0 }
  end
end
