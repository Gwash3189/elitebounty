module Fixtures
  def self.random_range(start = 1, finish = 200)
    (start..Faker::Number.between(start + 1, finish))
  end

  def self.payment_method
    methods = ["gold", "slaves", "minerals"]
    methods[Faker::Number.between(0, methods.length)]
  end

  def self.cmdr
    "CMDR #{Faker::Name.name}"
  end

  def self.boolean
    results = [true, false]
    results[Faker::Number.between(0, 1)]
  end

  def self.new_bounty
    date = Faker::Date.between(Date.today - 35, DateTime.now)
    expires_at = date + 30
    accepted = Fixtures::boolean

    bounty = Bounty.new({
      :expires_at => expires_at,
      :details => Faker::Lorem.sentence(3),
      :credits => Faker::Number.between(10000, 100000000),
      :payment_method => Fixtures::payment_method,
      :created_at => date,
      :target => Fixtures::cmdr,
      :payer => Fixtures::cmdr,
      :accepted => accepted,
      :accepted_by => accepted ? Fixtures::cmdr : nil
    })

    if bounty.accepted
      bounty.payed_out = Fixtures::boolean
    end

    if bounty.payed_out
      bounty.payed_out_at = Faker::Date.between(date, Date.today)
    end

    bounty
  end

  def self.generate
    require('faker')

    Fixtures::random_range.each do
      Fixtures::new_bounty.save
    end
  end
end

Fixtures::generate unless settings.production? || Bounty.any?
