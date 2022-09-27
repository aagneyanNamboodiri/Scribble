# frozen_string_literal: true

Rails.application.routes.draw do
  resources :articles, only: %i[index create show], param: :slug, defaults: { format: "json" }
  resources :categories, only: %i[index create], defaults: { format: "json" }

  root "home#index"
  get "*path", to: "home#index", via: :all
end
