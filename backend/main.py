from scripts.fetch_firms_data import fetch_firms_data
from scripts.weather_api import fetch_wind_data
from scripts.util import create_danger_zones
from scripts.mapbox_api import calculate_safe_route
from scripts.visualize_fires import visualize_route
import geocoder

# 1. Fetch fires
fires = fetch_firms_data()

# 2. Fetch wind
wind_speed, wind_deg = fetch_wind_data(lat=49.25, lon=123.1)

# 3. Create danger zones
danger_geojson = create_danger_zones(fires, wind_speed, wind_deg)


g = geocoder.ip('me')
latitude = 0
longitude = 0

# Print the latitude and longitude
if g.latlng:
    print(f"Latitude: {g.latlng[0]}, Longitude: {g.latlng[1]}")
    latitude = g.latlng[0]
    longitude = g.latlng[1]

print(latitude, longitude)
# 4. Calculate safe route
start = (longitude, latitude)
end = (-79.404076,43.643518)
route_coords = calculate_safe_route(start, end, danger_geojson)

# 5. Visualize
visualize_route(start, end, route_coords, danger_geojson, output_file="data/safe_route_map.html")