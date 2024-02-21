from decimal import Decimal, ROUND_HALF_UP

def pick_listings_ratio(max_loans, listings, AA=0, A=0, B=0, C=0, D=0, E=0, HR=0):
    """
    Optimize a portfolio of loans using the ratio of loan types given.

    For example, with max_loans = 10 and [AA, A, B, C, D, E, HR] = [4, 3, 2, 1, 0, 0, 0],
    it will pick 4 AA, 3 A, 2 B, 1 C, and no D, E, or HR. 

    With max_loans = 10, and  [AA, A, B, C, D, E, HR] = [1, 1, 1, 1, 1, 0, 0], 
    it will pick 2 AA, A, B, C, and D loans, and no E or HR. 

    Parameters:
    - max_loans (int): Maximum number of loans to select.
    - listings (list): List of loan dictionaries.
    - AA (int/double): Ratio of AA loans to pick 
    - A (int/double): Ratio of A loans to pick 
    - B (int/double): Ratio of B loans to pick
    - C (int/double): Ratio of C loans to pick
    - D (int/double): Ratio of D loans to pick
    - E (int/double): Ratio of E loans to pick
    - HR (int/double): Ratio of HR loans to pick

    Returns:
    - selected_loans (list): List of selected loan IDs.
    """
    if max_loans > len(listings):
        max_loans = len(listings)

    ratios = [AA, A, B, C, D, E, HR]
    sum_ratios = sum(ratios)
    scaled_ratios = [round_half_up(ratio * (max_loans / sum_ratios)) for ratio in ratios]
    selected_loans = []

    for ratio, pr in zip(scaled_ratios, ["AA", "A", "B", "C", "D", "E", "HR"]):
        sorted_listings = filter_and_sort_listings(listings, pr, ratio)
        if ratio + len(selected_loans) > max_loans:
            selected_loans += [listing['listing_number'] for listing in sorted_listings][:max_loans - len(selected_loans)]
        else:
            selected_loans += [listing['listing_number'] for listing in sorted_listings]

    return selected_loans

def filter_and_sort_listings(listings, prosper_rating, n):
    filtered_listings = [listing for listing in listings if listing['prosper_rating'] == prosper_rating]
    sorted_listings = sorted(filtered_listings, key=lambda x: x['lender_yield'], reverse=True)[:n]
    return sorted_listings

def round_half_up(n):
    return int(Decimal(str(n)).quantize(Decimal('1.'), rounding=ROUND_HALF_UP))
