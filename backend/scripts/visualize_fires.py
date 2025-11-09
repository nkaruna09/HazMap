import folium
import geojson

def visualize_route(start, end, route_coords, danger_geojson_str, output_file="data/safe_route_map.html"):
    # Load danger zone
    danger_geojson = geojson.loads(danger_geojson_str)
    
    # Center map roughly
    center_lat = (start[1]+end[1])/2
    center_lon = (start[0]+end[0])/2
    m = folium.Map(location=[center_lat, center_lon], zoom_start=10, tiles="CartoDB positron")
    
    # Danger zones
    folium.GeoJson(danger_geojson, style_function=lambda x: {
        'fillColor': 'red', 'color': 'red', 'opacity': 0.5, 'weight': 1
    }).add_to(m)
    
    # Start/End
    folium.Marker(location=[start[1], start[0]], popup="Start", icon=folium.Icon(color="green")).add_to(m)
    folium.Marker(location=[end[1], end[0]], popup="End", icon=folium.Icon(color="blue")).add_to(m)
    
    # Route
    folium.PolyLine([(lat, lon) for lon, lat in route_coords], color='blue', weight=5).add_to(m)
    
    # Save
    m.save(output_file)
    print(f"[INFO] Map saved to {output_file}")

    return m._repr_html_()