class Api::MessagesController < ApplicationController
  def index
  @messages = Message.where("id > ? && group_id = ?",params[:last_id],params[:group_id])
  end
end