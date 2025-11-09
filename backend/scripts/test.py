from geopy.geocoders import Nominatim

# Set a custom user agent to identify your app
geolocator = Nominatim(user_agent="MyGeopyApp")

# Try geocoding the location again
location = geolocator.geocode("4 Thorncliffe Park Drive, East York")
print(location.address)
print(f"Latitude: {location.latitude}, Longitude: {location.longitude}")