require "./helpers/dir-require"
require "./helpers/json"

before do
  require('byebug'); byebug;
  status 403 if Helpers.authentication_helper.is_authenticated?(request)
  return
end

Helpers::dir_require '/controllers'

get '*' do
  content_type :html
  send_file './public/index.html'
end
