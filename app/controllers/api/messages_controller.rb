class Api::MessagesController < ApplicationController
  def index
    @messages = Messages.find(params[:user_id]).where('id > ?', params[:id])
  end
end