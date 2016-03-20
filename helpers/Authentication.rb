require "OpenSSL"

module Helpers
  attr_accessor :current_player
  @current_player = nil;


  def self.authentication_helper
    @authentication_helper ||= Authentication.new
  end

  class Authentication
    def initialize()
      @cipher = OpenSSL::Cipher::AES256.new(:CBC)
      @key = @cipher.random_key
      @iv = @cipher.random_iv
      @cookie = {
        :key => "elitebounty.session",
        :path => '/',
        :expires_after => 432000,
      }
    end

    def encrypt(data)
      @cipher.update(data) + cipher.final
    end

    def is_authenticated?(request)
      require('byebug'); byebug
      return false if(request.cookies[:auth].nil?)

      decipher = OpenSSL::Cipher::AES256.new(:CBC)
      decipher.decrypt
      decipher.key = @key
      decipher.iv = @iv
      id = decipher.update(request.cookies[:auth]) + decipher.final
      begin
        Helpers.current_player = Player.find!(id);
      rescue
        false
      end
      true
    end

    def authenticate(id, response)
      encrypted_id = encrypt(id)
      response.set_cookie(@cookie.merge({ :secret => encrypted_id }))
    end
  end
end
