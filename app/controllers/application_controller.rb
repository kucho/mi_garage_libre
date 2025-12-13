# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :set_current_request_details

  private

  def set_current_request_details
    Current.profile = Profile.find_by(account: current_account) if current_account.present?
  end

  def current_account
    rodauth.rails_account
  end

  helper_method :current_account
end
