# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :articles, except: %i[new edit], param: :slug
    resources :categories, except: %i[show new edit] do
      member do
        put "reorder"
      end
    end
    resources :preferences, only: %i[index update]
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
