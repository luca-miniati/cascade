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
    - AA (int): Ratio of AA loans to pick 
    - A (int): Ratio of A loans to pick 
    - B (int): Ratio of B loans to pick
    - C (int): Ratio of C loans to pick
    - D (int): Ratio of D loans to pick
    - E (int): Ratio of E loans to pick
    - HR (int): Ratio of HR loans to pick

    Returns:
    - selected_loans (list): List of selected loan IDs.
    """
    ratios = [AA, A, B, C, D, E, HR]
    selected_loans = []

    if max_loans > len(listings):
        max_loans = len(listings)

    for ratio in ratios:
        if ratio != 0:
            # do something :P
            return 0
    return 0
