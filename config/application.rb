require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
    config.generators do |g|
      g.stylesheets true
      g.javascripts true
      g.helper true
      g.test_framework false
    end 
    config.time_zone = 'Tokyo'  #表記を日本時間にする
    config.i18n.default_locale = :ja
  end
end
