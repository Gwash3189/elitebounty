require "Base64"
require "./helpers/AESCrypt"
require "time"

module Helpers
  module Authentication
    def self.unauthenticated_endpoints
      @unauthenticated_endpoints ||= [
        '/',
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

    def self.username(env)
      Base64.strict_decode64(self.authorization_header(env)).split(':').first
    end

    def self.password(env)
      Base64.strict_decode64(self.authorization_header(env)).split(':')[1]
    end

    def self.authorization_header(env)
      env["HTTP_AUTHENTICATION"]
    end

    def self.elitebounty_authorization_header(env)
      env["HTTP_X_ELITEBOUNTY_AUTHENTICATION"]
    end

    def self.is_authenticated?(request_env, headers)
      authorization = Helpers::Authentication.authorization_header(request_env)
      elitebounty_authorization = Helpers::Authentication.elitebounty_authorization_header(request_env)

      return false if(authorization.nil? && elitebounty_authorization.nil?)

      if (!authorization.nil? && elitebounty_authorization.nil?)
        begin
          Helpers::Authentication.current_player = Player.all({:email => Helpers::Authentication.username(request_env)}).first
          Helpers::Authentication.authenticate(Helpers::Authentication.current_player, request_env) if Helpers::Authentication.current_player.password?(Helpers::Authentication.password(request_env))
        rescue
          return false
        end
        return true
      end

      if (!authorization.nil? && !elitebounty_authorization.nil?)
        begin
          id, time = Helpers::AESCrypt.decrypt(Helpers::Authentication.elitebounty_authorization_header(request_env)).split('__')

          if (Time.parse(time) < Time.now)
            Helpers::Authentication.revoke(request_env)
            return false
          end

          Helpers::Authentication.current_player = Player.get!(id)
          Helpers::Authentication.authenticate(Helpers::Authentication.current_player, headers)
        rescue
          return false
        end
        return true
      end

      return false
    end

    def self.authenticate(player, headers)
      headers['X-Elitebounty-Authentication'] = Helpers::AESCrypt.encrypt("#{player.id}__#{Time.now + 60 * 30}")
    end

    def self.revoke(headers)
      headers['X-Elitebounty-Authentication'] = '';
    end
  end
end
