class Player
  include DataMapper::Resource

  property :id, Serial, :key => true
  property :created_at, DateTime
  property :updated_at, DateTime
  property :cmdr_name, String, :length => 255
  property :email, String, :length => 255, :required => true
  property :password, String, :length => 255, :required => true
  property :salt, String, :length => 255, :required => true

  def payer!
    Bounty.all(:payer => @id)
  end

  def target!
    Bounty.all(:target => @id)
  end

  def accepted_by!
    Bounty.all(:accepted_by => @id)
  end

  def password
    BCrypt::Password.new(super)
  end

  def password=(unhashed)
    self.salt = Random.new_seed.to_s;
    super(BCrypt::Password.create(self.salt.to_s + unhashed.to_s))
    self.save
  end

  def password?(unhashed)
    password == self.salt + unhashed
  end

  def check_password(unhashed)
    stored_hashed = BCrypt::Password.new(@password)
    hashed = BCrypt::Password.create(unhashed)
    stored_hashed == hashed
  end

  def match?(player)
    @id == player.id
  end

  def to_json
    {
      :email => @email,
      :created_at => @created_at,
      :updated_at => @updated_at
    }.to_json
  end
end
