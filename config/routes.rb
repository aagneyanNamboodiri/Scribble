# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :articles, except: %i[new edit], param: :id
    resources :categories, except: %i[show new edit] do
      member do
        put "reorder"
      end
    end
    resources :organizations, only: %i[index update]
    resources :redirections, except: %i[new edit show]
  end
  namespace :public do
    resources :articles, only: %i[index show], param: :slug
    resources :categories, only: %i[index]
    resources :organizations, only: %i[index]
  end

  root "home#index"
  post "/login", to: "login#create"
  get "*path", to: "home#index", via: :all
end
