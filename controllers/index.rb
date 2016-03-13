require "./helpers/dir-require"
require "./helpers/json"

before do
  content_type :json
end

get '/' do
  content_type :html
  send_file './public/index.html'
end

Helpers::dir_require '/controllers'
