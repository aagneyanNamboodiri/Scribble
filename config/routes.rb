# frozen_string_literal: true

Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
    resources :articles, except: %i[new edit], param: :slug # , defaults: { format: 'json' }
    resources :categories, except: %i[show new edit] do
      member do
        put "reorder"
      end
    end
  end
  root "home#index"
  get "*path", to: "home#index", via: :all
end
