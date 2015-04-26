require 'sinatra'

get'/' do 
	erb :home
end

get '/about' do
	"This is about"
end