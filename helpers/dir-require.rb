module Helpers
  def self.dir_require(dir)
    dirs = Dir.entries("#{Dir.pwd}#{dir}")
           .select do |s|
             (!s.include?('.') || s.include?('.rb')) and !s.include?('index.rb')
           end
           .each do |file|
             require "#{Dir.pwd}#{dir}/#{file}"
           end
  end
end
