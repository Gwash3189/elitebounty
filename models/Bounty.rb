class Bounty
  include DataMapper::Resource

  property :id, Serial, :key => true
  property :created_at, DateTime
  property :updated_at, DateTime
  property :payed_out_at, DateTime

  property :accepted_by, Text
  property :payed_out, Boolean, :required => false
  property :payer, Text, :required => true
  property :target, Text, :required => true
  property :details, Text, :required => true
  property :credits, Integer, :required => true
  property :accepted, Boolean, :default => false
  property :expires_at, DateTime, :required => true
  property :payment_method, String, :length => 255, :required => true

  def is_expired?
    self if Date.today > self.expires_at
  end

  def expired_at
    self.expires_at
  end
end
