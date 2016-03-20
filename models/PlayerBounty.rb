class Playerbounty
  include DataMapper::Resource

  property :id, Serial, :key => true
  property :created_at, DateTime
  property :updated_at, DateTime

  belongs_to :player
  belongs_to :bounty
end
