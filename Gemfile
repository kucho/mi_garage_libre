# frozen_string_literal: true

source "https://rubygems.org"

ruby file: "mise.toml"

gem "alba"
gem "alba-inertia"
gem "bcrypt", require: false
gem "bootsnap", require: false
gem "image_processing", "~> 1.2"
gem "inertia_rails"
gem "kamal", require: false
gem "pg", "~> 1.1"
gem "propshaft"
gem "puma", ">= 5.0"
gem "rails", "~> 8.1.1"
gem "resend"
gem "rodauth-i18n"
gem "rodauth-rails"
gem "sequel-activerecord_connection", require: false
gem "solid_cable"
gem "solid_cache"
gem "solid_queue"
gem "thruster", require: false
gem "tilt", require: false
gem "typelizer"
gem "tzinfo-data", platforms: [:windows, :jruby]
gem "vite_rails"

group :development, :test do
  gem "bundler-audit", require: false
  gem "debug", platforms: [:mri, :windows], require: "debug/prelude"
end

group :development do
  gem "letter_opener_web"
  gem "rubocop-minitest", require: false
  gem "rubocop-performance", require: false
  gem "rubocop-rails", require: false
  gem "rubocop-rake", require: false
  gem "rubocop-shopify", require: false
  gem "rubocop-thread_safety", require: false
  gem "web-console"
end

group :test do
  gem "minitest-rails"
end
