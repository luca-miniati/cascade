import random

def pick_random_listings(listings, max_loans=5):
    random_loans = random.sample(listings, max_loans)
    random_listing_numbers = [loan['listing_number'] for loan in random_loans]
    return random_listing_numbers