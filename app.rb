require 'bundler'
Bundler.require

use Rack::PostBodyContentTypeParser

if ENV['RACK_ENV'] != 'production'
  ENV['RACK_ENV'] = 'development'
end

configure do
  set :environment, ENV['RACK_ENV'] == 'development' ? :development : :production
end


use Rack::Throttle::Minute, :max => 30 if settings.production?
require "./helpers/Authentication"
require "./models/index"
require "./fixtures/index" if settings.development?
require "./controllers/index"
