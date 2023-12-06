import os

from os import getenv
from dotenv import load_dotenv

from utils import authenticate_personal, get_listings

load_dotenv()

client_id = os.getenv('PROSPER_APP_CLIENT_ID')
client_secret = os.getenv('PROSPER_APP_CLIENT_SECRET')
username = os.getenv('PROSPER_APP_USERNAME')
password = os.getenv('PROSPER_APP_PASSWORD')

access_token, refresh_token, expires_at = authenticate_personal(
    client_id, client_secret, username, password
)

pre_processed_listings = get_listings(
    access_token,
    {
        'limit': 100,
        'biddable': False
    }
)
listings = []
for i in range(len(pre_processed_listings['result'])):
    listings.append({
        'listing_number' : pre_processed_listings['result'][i]['listing_number'],
        'prosper_rating' : pre_processed_listings['result'][i]['prosper_rating'],
        'lender_yield' : pre_processed_listings['result'][i]['lender_yield'],
    })
