# import numpy as np
import pandas as pd

# import seaborn as sns

listings = pd.read_csv('data/Listings_20050101to20130101_20210114T163603.csv')
loans = pd.read_csv('data/Loans_20050101to20130101_20231020T060004.csv')

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

listings.dropna(subset=listings_merge_columns, inplace=True)
listings['loan_origination_date'] = pd.to_datetime(
    listings['loan_origination_date'])

loans.dropna(subset=loans_merge_columns, inplace=True)
loans['origination_date'] = pd.to_datetime(loans['origination_date'])

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
)

listings_final.to_csv('data/listings_05_13_merged.csv', index=False)
