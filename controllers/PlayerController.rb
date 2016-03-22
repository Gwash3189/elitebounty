get '/players' do
  Helpers::json Players.page({
    :per_page => 100,
    :page => request.params["page"] || 1
  })
end

get '/player/:id' do |id|
  player = Player.get(params[:id].to_i)

  if player
    Helpers::json player
  else
    status 404
  end
end

post '/player' do
  player = Player.new({
    :email => request.params["email"],
    :password => request.params["password"],
    :created_at => Time.now
  })

  if player.save
    Helpers::json player
  else
    status 500
  end
end

unauthenticated :post, '/player/login' do
  player = Player.all({ :email => Helpers::Authentication.username(headers) }).first

  if (player && player.password?(Helpers::Authentication.password(headers)))
    Helpers::Authentication.authenticate(player, headers)
    status 200
  else
    status 401
  end
end

put '/player/:id' do
  player = Bounty.get(params[:id].to_i)

  if player.update(request.params)
    Helpers::json bounty
  else
    status 404
  end
end
