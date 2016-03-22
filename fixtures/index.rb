require('faker')

module Fixtures
  def self.random_range(start = 1, finish = 200)
    (start..Faker::Number.between(start + 1, finish))
  end

  def self.payment_method
    methods = ["gold", "slaves", "minerals"]
    methods[Faker::Number.between(0, methods.length - 1)]
  end

  def self.boolean
    results = [true, false]
    results[Faker::Number.between(0, 1)]
  end

  def self.new_bounty(target, payer, accepted_by)
    date = Faker::Time.between(payer.created_at, Time.now)
    expires_at = date + 30
    accepted = Fixtures::boolean

    bounty = Bounty.new({
      :accepted_by => accepted ? accepted_by : nil,
      :created_at => date,
      :expires_at => expires_at,
      :payer => payer,
      :target => target,
      :details => Faker::Lorem.sentence(3),
      :credits => Faker::Number.between(10000, 100000000),
      :payment_method => Fixtures::payment_method,
      :payed_out_at => Fixtures::boolean ? Faker::Date.between(date, Time.now) : nil
    })
  end

  def self.new_player
    Player.create({
      :created_at => Faker::Time.between(Date.today - 35, Time.now),
      :email => Faker::Internet.email,
      :password => Faker::Internet.password
    })
  end

  def self.new_admin
    Player.create({
      :created_at => Faker::Time.between(Date.today - 35, Time.now),
      :email => 'admin@admin.com',
      :password => 'admin'
    })
  end

  def self.generate
    range = Fixtures::random_range

    puts "#{range} Bounties to be made"

    range.each do
      result = Fixtures::new_bounty(Fixtures::new_player, Fixtures::new_player, Fixtures::new_player).save

      puts "Time: #{Time.now}; Made?: #{result}"
    end

    Fixtures::new_admin

    puts "Bounties: #{Bounty.all.length}"
    puts "Players: #{Player.all.length}"
  end
end

Fixtures::generate unless settings.production? || Bounty.any?
