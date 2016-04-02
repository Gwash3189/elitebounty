module Helpers
  def self.json(j)
    j.to_json
  end

  def self.params(request)
    @params ||= JSON.parse(request.body.read)
  end
end
