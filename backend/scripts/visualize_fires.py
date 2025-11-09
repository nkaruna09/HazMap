import pandas as pd
import folium
import requests

# Load local FIRMS data
fires = pd.read_csv("../data/firms_latest.csv")

# Base map centered roughly on Canada
m = folium.Map(location=[56, -106], zoom_start=4)

# Add fire points
for _, row in fires.iterrows():
    folium.CircleMarker(
        location=[row["latitude"], row["longitude"]],
        radius=3,
        color="red",
        fill=True,
        fill_opacity=0.6,
        popup=f"Brightness: {row['bright_ti4']}, Date: {row['acq_date']}"
    ).add_to(m)

# Optionally: get wind data (example using OpenWeatherMap)
API_KEY = "YOUR_OPENWEATHER_KEY"
lat, lon = 49.25, -123.1  # example: Vancouver
url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"

r = requests.get(url).json()
wind = r["wind"]
print(f"Wind near Vancouver: {wind}")

# Save the map
m.save("../data/fires_map.html")
print("[INFO] Map saved to ../data/fires_map.html")