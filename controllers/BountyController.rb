get '/bountys' do
  Helpers::json Bounty.page({
    :per_page => 100,
    :page => request.params["page"] || 1
  })
end

get '/bounty/:id' do |id|
  bounty = Bounty.get(params[:id].to_i)

  if bounty
    Helpers::json bounty
  else
    status 404
  end
end

post '/bounty' do
  bounty = Bounty.new({
    :expires_at => Date.today + 30,
    :details => request.params["details"],
    :credits => request.params["credits"],
    :payment_method => request.params["payment_method"],
    :created_at => Time.now,
    :target => request.params["target"],
    :payer => request.params["payer"]
  })

  if bounty.save
    Helpers::json bounty
  else
    status 500
  end
end

put '/bounty/:id' do
  bounty = Bounty.get(params[:id].to_i)

  if bounty.update(request.params)
    Helpers::json bounty
  else
    status 404
  end
end

delete '/bounty/:id' do
  bounty = Bounty.get(params[:id].to_i)

  if bounty.destroy
    status 200
  else
    status 404
  end
end
