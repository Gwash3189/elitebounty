require "./helpers/dir-require"
require "./helpers/json"

before do
  unless  Helpers::Authentication.unauthenticated_endpoint?(request.path_info)
    halt 401 unless Helpers::Authentication.is_authenticated?(request.env, headers)
  end
end

after do
  response.redirect('/') unless response.status == 200
end

Helpers::dir_require '/controllers'

unauthenticated :get, '/' do
  content_type :html
  send_file './public/index.html'
end
