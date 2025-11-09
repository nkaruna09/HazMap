import requests
import os
from dotenv import load_dotenv

#Load the .env file
load_dotenv()

#Get Mapbox API Key from environment variable
OPENWEATHER_KEY = os.getenv('WEATHER_API_KEY')

def fetch_wind_data(lat, lon):
    """
    Fetch wind speed (m/s) and direction (deg) for a given latitude and longitude.
    """
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_KEY}&units=metric"
    r = requests.get(url).json()

    wind_speed = r['wind']['speed']
    wind_deg = r['wind']['deg']
    print(f"Wind speed: {wind_speed} m/s, Wind direction: {wind_deg}Â°")
    return wind_speed, wind_deg
