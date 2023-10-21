import os

from dotenv import load_dotenv

from utils import authenticate_personal, get_listings

load_dotenv()
client_id = os.environ.get('PROSPER_APP_CLIENT_ID')
client_secret = os.environ.get('PROSPER_APP_CLIENT_SECRET')
username = os.environ.get('PROSPER_APP_USERNAME')
password = os.environ.get('PROSPER_APP_PASSWORD')

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
