import os
from dotenv import load_dotenv
from mapbox import Directions

import folium
import requests
import geocoder

# Load the .env file
load_dotenv()

# Get Mapbox API Key from environment variable
mapbox_api_key = os.getenv('MAPBOX_API_KEY')

# Get location based on your public IP address
g = geocoder.ip('me')
latitude = 0
longitude = 0

# Print the latitude and longitude
if g.latlng:
    print(f"Latitude: {g.latlng[0]}, Longitude: {g.latlng[1]}")
    latitude = g.latlng[0]
    longitude = g.latlng[1]
else:
    print("Unable to fetch location.")


mapbox_route_url = f"https://api.mapbox.com/directions/v5/mapbox/driving/-80%2C43%3B-79.404076%2C43.643518?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token={mapbox_api_key}"

# Fetch route data from the Mapbox API response URL
response = requests.get(mapbox_route_url)

# Check if the response was successful
if response.status_code == 200:
    route_data = response.json()
else:
    print(f"Failed to fetch route: {response.status_code}")
    route_data = None

# If route data is successfully retrieved, proceed with plotting the route
if route_data:
    # Extract the route geometry (coordinates of the route)
    route_geometry = route_data['routes'][0]['geometry']['coordinates']
    
    # Create a map centered on the start of the route (or any point)
    start_lat, start_lon = route_geometry[0]  # Starting point of the route
    route_map = folium.Map(location=[start_lat, start_lon], zoom_start=12)

    # Add the route geometry to the map as a polyline
    folium.PolyLine(route_geometry, color="blue", weight=4, opacity=0.7).add_to(route_map)

    # Optionally, add markers for start and end points
    folium.Marker([start_lat, start_lon], popup="Start").add_to(route_map)
    end_lat, end_lon = route_geometry[-1]  # Ending point of the route
    folium.Marker([end_lat, end_lon], popup="End").add_to(route_map)

    # Save the map to an HTML file
    route_map.save('route_map.html')

    # Display the map (you can open the saved HTML file in a browser)
    print("Route map saved as 'route_map.html'. Open it in a browser to view the map.")
else:
    print("Failed to fetch route data.")



