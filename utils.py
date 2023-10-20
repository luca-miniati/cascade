import json
from time import time

base_url = 'https://api.prosper.com'
auth_url = 'https://api.prosper.com/v1/security/oauth/token'
listings_url = '/listingsvc/v2/listings/'

def authenticate_personal(client_id, client_secret, username, password):
    auth_headers = {
        'Accept': 'application/json',
        'Content-type': 'application/x-www-form-urlencoded',
    }

    auth_params = {
        'grant_type': 'password',
        'client_id': client_id,
        'client_secret': client_secret,
        'username': username,
        'password': password,
    }

    res = requests.request(
        'POST', 
        auth_url,
        headers=auth_headers,
        params=auth_params,
    )

    data = json.loads(res.content.decode('utf-8'))
    return data['access_token'], data['refresh_token'], time() + int(data['expires_in'])

def get_listings(access_token, params):
    listing_headers = {
        'Authorization': f'bearer {access_token}',
        'Accept': 'application/json',
    }
    
    res = requests.request(
        'GET',
        base_url + listings_url,
        headers=listing_headers,
        params=params,
    )

    data = json.loads(res.content.decode('utf-8'))
    return data
