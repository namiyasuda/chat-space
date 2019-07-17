class Api::MessagesController < ApplicationController
  def index
    # @group = Group.find(params[:group_id])
    # @messages = @group.messages.includes(:user).where('id > ?', params[:id])
    @messages = Messages.where(params[:user_id]).where('id > ?', params[:id])
  end
end