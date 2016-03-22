module Helpers
  module AESCrypt
    def self.key(cipher)
      if @key.nil?
        @key = cipher.random_key
        return @key
      else
        @key
      end
    end

    def self.iv(cipher)
      if @iv.nil?
        @iv = cipher.random_iv
        return @iv
      else
        @iv
      end
    end

    # Decrypts a block of data (encrypted_data) given an encryption key
    # and an initialization vector (iv).  Keys, iv's, and the data
    # returned are all binary strings.  Cipher_type should be
    # "AES-256-CBC", "AES-256-ECB", or any of the cipher types
    # supported by OpenSSL.  Pass nil for the iv if the encryption type
    # doesn't use iv's (like ECB).
    #:return: => String
    #:arg: encrypted_data => String
    #:arg: key => String
    #:arg: iv => String
    #:arg: cipher_type => String
    def self.decrypt(encrypted_data)
      aes = OpenSSL::Cipher::Cipher.new("AES-256-CBC")
      aes.decrypt
      aes.key = Helpers::AESCrypt.key(aes)
      aes.iv = Helpers::AESCrypt.iv(aes)
      aes.update(CGI.unescape(encrypted_data.to_s)) + aes.final
    end

    # Encrypts a block of data given an encryption key and an
    # initialization vector (iv).  Keys, iv's, and the data returned
    # are all binary strings.  Cipher_type should be "AES-256-CBC",
    # "AES-256-ECB", or any of the cipher types supported by OpenSSL.
    # Pass nil for the iv if the encryption type doesn't use iv's (like
    # ECB).
    #:return: => String
    #:arg: data => String
    #:arg: key => String
    #:arg: iv => String
    #:arg: cipher_type => String
    def self.encrypt(data)
      aes = OpenSSL::Cipher::Cipher.new("AES-256-CBC")
      aes.encrypt
      aes.key = Helpers::AESCrypt.key(aes)
      aes.iv = Helpers::AESCrypt.iv(aes)
      CGI.escape(aes.update(data.to_s) + aes.final)
    end
  end
end
