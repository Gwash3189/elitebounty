unauthenticated :post, '/player/login' do
  player = Player.all({ :email => Helpers::Authentication.username(request.env) }).first

  if (player && player.password?(Helpers::Authentication.password(request.env)))
    Helpers::Authentication.authenticate(player, headers)
    status 200
  else
    halt 500
  end
end

unauthenticated :post, '/player/register' do
  player = nil
  params = Helpers::params(request)

  if (Player.all({:email => params["email"]}).first.nil? && params["password"] === params["confirmPassword"])
    player = Player.new({
      :email => params["email"],
      :password => params["password"],
      :created_at => Time.now
    })
  end

  if player && player.save
    Helpers::json player
  else
    halt 500
  end
end

get '/players' do
  params = Helpers::params(request)

  Helpers::json Players.page({
    :per_page => 100,
    :page => params["page"] || 1
  })
end

get '/player/:id' do |id|
  player = Player.get(params[:id].to_i)

  if player
    Helpers::json player
  else
    halt 404
  end
end

post '/player' do
  params = Helpers::params(request)

  player = Player.new({
    :email => params["email"],
    :password => params["password"],
    :created_at => Time.now
  })

  if player.save
    Helpers::json player
  else
    halt 500
  end
end

put '/player/:id' do
  player = Player.get(params[:id].to_i)

  if player.match?(Helpers::Authentication.current_player)
    halt 404 unless player.update(request.params)
    Helpers::json player
  end
end
