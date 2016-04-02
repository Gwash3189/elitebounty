get '/bountys' do
  offset = request.params["page"].to_i > 0 ? request.params["page"].to_i * 100 : 100

  Helpers::json Bounty.all({
    :order => [ :created_at.desc ]
  });
end

get '/bounty/:id' do |id|
  bounty = Bounty.get(params[:id].to_i)

  if bounty
    Helpers::json bounty
  else
    halt 404
  end
end

post '/bounty' do
  params = Helpers::params(request)

  bounty = Bounty.new({
    :expires_at => Date.today + 30,
    :details => params["details"],
    :credits => params["credits"],
    :payment_method => params["payment_method"],
    :created_at => Time.now,
    :target => params["target"],
    :payer => params["payer"]
  })

  if bounty.save
    Helpers::json bounty
  else
    halt 500
  end
end

put '/bounty/:id' do
  bounty = Bounty.get(params[:id].to_i)
  params = Helpers::params(request)

  if bounty.update(params)
    Helpers::json bounty
  else
    halt 404
  end
end

delete '/bounty/:id' do
  bounty = Bounty.get(params[:id].to_i)

  if bounty.destroy
    halt 200
  else
    halt 404
  end
end
