import requests
import pandas as pd

# URL of the FIRMS API for VIIRS data
def fetch_firms_data():
    url = "https://firms.modaps.eosdis.nasa.gov/api/area/csv/959239e98f8de0554b6c5be997d5c4ec/VIIRS_SNPP_NRT/world/1"

    # Fetch the CSV data from the API
    response = requests.get(url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Load the data directly into a pandas DataFrame
        from io import StringIO
        data = pd.read_csv(StringIO(response.text))
    else:
        print("Failed to retrieve data, status code:", response.status_code)

    # Check the first few rows of data to verify it's correct
    print(data.head())
    return data
