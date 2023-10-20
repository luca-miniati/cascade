import numpy as np
import pandas as pd
import seaborn as sns

listings = pd.read_csv('data/listings_05_13.csv')
loans = pd.read_csv('data/loans_05_13.csv')

listings['loan_origination_date'] = pd.to_datetime(listings['loan_origination_date'])
loans['origination_date'] = pd.to_datetime(loans['origination_date'])

listings_merge_columns = [
    'loan_origination_date',
    'listing_amount',
    'borrower_rate'
]
loans_merge_columns = [
    'origination_date',
    'amount_borrowed',
    'borrower_rate'
]

listings_no_duplicates = listings[~listings.duplicated(
    subset=listings_merge_columns, keep=False)]
loans_no_duplicates = loans[~loans.duplicated(
    subset=loans_merge_columns, keep=False)]

listings_final = pd.merge(
    listings_no_duplicates,
    loans_no_duplicates,
    left_on=listings_merge_columns,
    right_on=loans_merge_columns,
    how='left'
).drop('loan_origination_date', axis=1)

listings_final.to_csv('data/listings_05_13_merged.csv')
