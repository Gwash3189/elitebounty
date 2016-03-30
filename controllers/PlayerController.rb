unauthenticated :post, '/player/login' do
  player = Player.all({ :email => Helpers::Authentication.username(request.env) }).first

  if (player && player.password?(Helpers::Authentication.password(request.env)))
    Helpers::Authentication.authenticate(player, headers)
    status 200
  else
    status 401
  end
end

unauthenticated :post, '/player/register' do
  player = nil

  if (Player.all({:email => request.params["email"]}).first.nil? && request.params["password"] === request.params["confirmPassword"])
    player = Player.new({
      :email => request.params["email"],
      :password => request.params["password"],
      :created_at => Time.now
    })
  end

  if player && player.save
    Helpers::json player
  else
    status 500
  end
end

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

put '/player/:id' do
  player = Player.get(params[:id].to_i)

  if player.match?(Helpers::Authentication.current_player)
    status 404 unless player.update(request.params)
    Helpers::json player
  end
end
