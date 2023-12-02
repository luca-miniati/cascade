import os

from os import getenv

from utils import authenticate_personal, get_listings

client_id = os.getenv('PROSPER_APP_CLIENT_ID')
client_secret = os.getenv('PROSPER_APP_CLIENT_SECRET')
username = os.getenv('PROSPER_APP_USERNAME')
password = os.getenv('PROSPER_APP_PASSWORD')

access_token, refresh_token, expires_at = authenticate_personal(
    client_id, client_secret, username, password
)

listings = get_listings(
    access_token,
    {
        'limit': 100,
        'biddable': False
    }
)