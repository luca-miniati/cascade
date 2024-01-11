def get_loan_info(listings, listing_number):
    for loan in listings:
        if loan['listing_number'] == listing_number:
            return loan
        
    return None

def get_total_return(listings, selected_loans):
    total_return = 0

    for listing_number in selected_loans:
        loan = get_loan_info(listings, listing_number=listing_number)
        if loan['loan_status'] == 0:
            total_return += 25 + (25 * loan['lender_yield'])

    return total_return

def get_default_rate(listings, selected_loans):
    total_loans = len(selected_loans)

    total_default = 0

    for listing_number in selected_loans:
        loan = get_loan_info(listings, listing_number=listing_number)
        if loan['loan_status'] == 1:
            total_default += 1

    return total_default / total_loans

def get_prosper_ratings(listings, selected_loans):
    rating_counts = [0, 0, 0, 0, 0, 0, 0]

    for listing_number in selected_loans:
        pr = get_loan_info(listings, listing_number=listing_number)['prosper_rating']

        if pr == "AA":
            rating_counts[0] += 1
        elif pr == "A":
            rating_counts[1] += 1
        elif pr == "B":
            rating_counts[2] += 1
        elif pr == "C":
            rating_counts[3] += 1
        elif pr == "D":
            rating_counts[4] += 1
        elif pr == "E":
            rating_counts[5] += 1
        elif pr == "HR":
            rating_counts[6] += 1
    return rating_counts