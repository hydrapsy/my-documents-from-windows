require 'sinatra'

get "/" do
	erb :home
end

get "/about" do
	"this is the about page"
	erb :about
end

get "/contact" do
	"this is the contact page"
	erb :contact
end


get '/contact' do
	@title ="contact"
	erb :contact
end
post '/contact' do
	puts params.inspect
	puts "sending email!!!"
	redirect to('thanks')
end
get 'thanks' do
	erb :thanks
end
get '/offices/nyc' do
	erb :nyc
end