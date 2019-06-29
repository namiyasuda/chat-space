Rails.application.routes.draw do
  root to: 'messages#index'
  get 'messages/new' => 'messages#new'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
