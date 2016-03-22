require "Base64"
require "./helpers/AESCrypt"

module Helpers
  module Authentication
    def self.unauthenticated_endpoints
      @unauthenticated_endpoints ||= [
        '/player/login',
        '/',
        '/bountys',
        '.map',
        '/favicon.ico',
        '.js',
      ]
    end

    def self.unauthenticated_endpoint?(endpoint)
      Helpers::Authentication.unauthenticated_endpoints.select do |str|
        endpoint == str
      end.length > 0
    end

    def self.current_player
      @current_player
    end

    def self.current_player=(player)
      @current_player = player
    end

    def self.username(headers)
      Base64.strict_decode64(self.authorization_header(headers)).split(':').first
    end

    def self.password(headers)
      Base64.strict_decode64(self.authorization_header(headers)).split(':')[1]
    end

    def self.authorization_header(headers)
      headers["Authorization"]
    end

    def self.elitebounty_authorization_header(headers)
      headers["X-Elitebounty-Authorization"]
    end

    def self.is_authenticated?(headers)
      authorization = Helpers::Authentication.authorization_header(headers)
      elitebounty_authorization = Helpers::Authentication.elitebounty_authorization_header(headers)

      return false if(authorization.nil? && elitebounty_authorization.nil?)

      if (!authorization.nil? && elitebounty_authorization.nil?)
        begin
          Helpers::Authentication.current_player = Player.all({:email => Helpers::Authentication.username(headers)}).first
          Helpers::Authentication.authenticate(Helpers::Authentication.current_player, headers) if Helpers::Authentication.current_player.password?(Helpers::Authentication.password(headers))
        rescue
          return false
        end
        return true
      end

      if (!authorization.nil? && !elitebounty_authorization.nil?)
        id = Helpers::AESCrypt.decrypt(Helpers::Authentication.elitebounty_authorization_header(headers))
        begin
          Helpers::Authentication.current_player = Player.find!(id);
        rescue
          return false
        end
        return true
      end

      return false
    end

    def self.authenticate(player, headers)
      headers['X-Elitebounty-Authorization'] = Helpers::AESCrypt.encrypt(player.id)
    end
  end
end
