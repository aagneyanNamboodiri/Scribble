# frozen_string_literal: true

class ReportDownloadChannel < ApplicationCable::Channel
  def subscribed
    stream_from User.first.id
  end

  def unsubscribed
    stop_all_streams
  end
end
