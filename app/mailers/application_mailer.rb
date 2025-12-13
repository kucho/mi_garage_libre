# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  default from: "Mi Garage Libre <support@migaragelibre.com>"

  layout "mailer"
end
