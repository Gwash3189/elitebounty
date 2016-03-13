require "./helpers/dir-require"

DataMapper.setup(:default, "sqlite://#{Dir.pwd}/development.sqlite") unless settings.production?
DataMapper.setup(:default, "postgres://user:password@hostname/database") unless settings.development?

Helpers::dir_require '/models'

DataMapper.auto_upgrade!
DataMapper.finalize
