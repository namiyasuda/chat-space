class Api::MessagesController < ApplicationController
  def index
    @messages = Messages.where(params[:user_id]).where('id > ?', params[:id])
  end
end