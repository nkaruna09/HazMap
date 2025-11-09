import requests
import os
from dotenv import load_dotenv

#Load the .env file
load_dotenv()

#Get Mapbox API Key from environment variable
MAPBOX_TOKEN = os.getenv('MAPBOX_API_KEY')

def calculate_safe_route(start, end, danger_geojson):
    """
    start, end: tuples (lon, lat)
    danger_geojson: GeoJSON string for avoid_polygons
    Returns a list of coordinates for the safe route.
    """
    url = f"https://api.mapbox.com/directions/v5/mapbox/driving/{start[0]},{start[1]};{end[0]},{end[1]}"
    params = {
        "access_token": MAPBOX_TOKEN,
        "geometries": "geojson",
        "overview": "full",
        #"avoid_polygons": danger_geojson
    }
    r = requests.get(url, params=params).json()

    if "routes" not in r or len(r["routes"]) == 0:
        raise Exception("No route found.")
    
    return r["routes"][0]["geometry"]["coordinates"]