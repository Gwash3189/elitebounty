module Routes
  def unauthenticated(verb, route, &block)
    Helpers::Authentication.unauthenticated_endpoints.push(route)
    ::Sinatra::Application.send(verb.to_s, route, &block)
  end
end

extend Routes
