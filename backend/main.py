from flask import send_file
from scripts.fetch_firms_data import fetch_firms_data
from scripts.weather_api import fetch_wind_data
from scripts.util import create_danger_zones
from scripts.mapbox_api import calculate_safe_route
from scripts.visualize_fires import visualize_route
import geocoder

from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS to handle cross-origin requests

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def direction_map(start=(-79, 43), end=(-79.404076,43.643518)):
    # Enable CORS for all routes

    # 1. Fetch fires    
    fires = fetch_firms_data()

    # 2. Fetch wind
    wind_speed, wind_deg = fetch_wind_data(lat=49.25, lon=123.1)

    # 3. Create danger zones
    danger_geojson = create_danger_zones(fires, wind_speed, wind_deg)

    # 4. Calculate safe route

    route_coords = calculate_safe_route(start, end, danger_geojson)

    # 5. Visualize
    output_file = "data/safe_route_map.html"
    visualize_route(start, end, route_coords, danger_geojson, output_file)

    return send_file(output_file)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)