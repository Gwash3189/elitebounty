class Bounty
  include DataMapper::Resource

  property :id, Serial, :key => true
  property :accepted_by, String, :length => 255
  property :created_at, DateTime
  property :updated_at, DateTime
  property :payed_out_at, DateTime
  property :payer, String, :length => 255, :required => true
  property :target, String, :length => 255, :required => true
  property :details, Text, :required => true
  property :credits, Integer, :required => true
  property :expires_at, DateTime, :required => true
  property :payment_method, String, :length => 255, :required => true

  def payer!
    Player.get(@payer.to_i)
  end

  def target!
    Player.get(@target.to_i)
  end

  def accepted_by!
    Player.get(@accepted_by.to_i)
  end

  def payer=(model)
    super(model.id.to_s)
  end

  def target=(model)
    super(model.id.to_s)
  end

  def accepted_by=(model)
    super(model.id.to_s) unless model.nil?
  end

  def accepted?
    @accepted_by.nil?
  end

  def payed_out?
    @payed_out_at.nil?
  end

  def expired?
    Date.today > @expires_at
  end
end
