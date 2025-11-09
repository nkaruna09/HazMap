from shapely.geometry import Point, mapping
from shapely.affinity import rotate, scale
from shapely.ops import unary_union
import geojson

BASE_BUFFER_DEG = 0.03
WIND_SCALE_FACTOR = 0.03

def create_danger_zones(fires_df, wind_speed, wind_deg):
    """
    Generate wind-adjusted danger zones as a GeoJSON feature.
    """
    polygons = []
    
    for _, row in fires_df.iterrows():
        p = Point(row['longitude'], row['latitude']).buffer(BASE_BUFFER_DEG)
        rotated = rotate(p, -wind_deg, origin='center', use_radians=False)
        stretched = scale(rotated, xfact=1 + wind_speed*WIND_SCALE_FACTOR, yfact=1, origin='center')
        final_poly = rotate(stretched, wind_deg, origin='center', use_radians=False)
        polygons.append(final_poly)
    
    danger_zone = unary_union(polygons)
    danger_geojson = geojson.Feature(geometry=mapping(danger_zone))
    return geojson.dumps(danger_geojson)