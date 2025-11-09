import folium
from fetch_firms_data import fetch_firms_data  # 👈 import your fetcher

NASA_API_KEY = "YOUR_API_KEY"
fires = fetch_firms_data()

# Build map
m = folium.Map(location=[56, -106], zoom_start=4)
for _, row in fires.iterrows():
    folium.CircleMarker(
        location=[row["latitude"], row["longitude"]],
        radius=3,
        color="red",
        fill=True,
        fill_opacity=0.6,
        popup=f"Brightness: {row['bright_ti4']}, Date: {row['acq_date']}"
    ).add_to(m)

m.save("../data/fires_map.html")
print("[INFO] Map saved to ../data/fires_map.html")
