# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    namespace :api do
      resources :articles, except: %i[new edit], param: :id do
        resources :article_versions, only: %i[index show]
        member do
          put :reorder
          get :articles_of_category
        end
        put :bulk_articles_category_update, on: :collection
      end
      resources :categories, except: %i[show new edit] do
        put :reorder, on: :member
      end
      resource :organization, only: %i[show update]
      resources :redirections, except: %i[new edit show]
      resources :analytics, only: %i[index show]
      resources :article_status_schedules, only: %i[index, create, delete]
      post "/login", to: "login#create"
    end
    namespace :public do
      resources :articles, only: %i[index show], param: :slug
      resources :categories, only: %i[index]
    end
  end

  root "home#index"
  get "*path", to: "home#index", via: :all
end
