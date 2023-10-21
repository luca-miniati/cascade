import pandas as pd
import pickle
import os
import glob
import re

from sklearn.preprocessing import LabelEncoder

if not os.path.exists('data/raw'):
    os.makedirs('data/raw')
if not os.path.exists('data/clean'):
    os.makedirs('data/clean')

all_listings = glob.glob('data/raw/Listings*.csv')
all_loans = glob.glob('data/raw/Loans*.csv')

for listings_path, loans_path in zip(all_listings, all_loans):
    if not os.path.exists(listings_path):
        print(f'File {listings_path} not found')

    if not os.path.exists(loans_path):
        print(f'File {loans_path} not found')

    listings = pd.read_csv(listings_path, low_memory=False)
    loans = pd.read_csv(loans_path)

    listings_merge_columns = [
        'loan_origination_date',
        'listing_amount',
        'borrower_rate',
        'prosper_rating'
    ]
    loans_merge_columns = [
        'origination_date',
        'amount_borrowed',
        'borrower_rate',
        'prosper_rating'
    ]

    listings.dropna(subset=listings_merge_columns, inplace=True)
    listings['loan_origination_date'] = pd.to_datetime(
        listings['loan_origination_date'])

    loans.dropna(subset=loans_merge_columns+['loan_status'], inplace=True)
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
        how='outer'
    )

    listings_columns = [
        'fico_score',
        'employment_status_description',
        'dti_wprosper_loan',
        'prior_prosper_loans',
        'prior_prosper_loans_active',
        'investment_typeid',
        'borrower_apr',
        'income_verifiable',
        'listing_category_id',
        'months_employed',
        'income_range',
        'prosper_score',
        'prosper_rating',
        'listing_monthly_payment',
        'stated_monthly_income',
        'lender_indicator',
        'lender_yield',
        'occupation',
        'listing_amount',
        'borrower_rate',
        'loan_status',
    ]

    listings_final = listings_final[listings_columns].dropna()
    listings_final_no_encode = listings_final.copy()

    if not os.path.exists('label_encoders'):
        os.makedirs('label_encoders')

    for col in ['fico_score', 'employment_status_description', 'income_verifiable', 'occupation', 'prosper_rating']:
        le = LabelEncoder()
        listings_final[col] = le.fit_transform(listings_final[col])

        with open(f'label_encoders/le_{col}.pkl', 'wb') as f:
            pickle.dump(le, f)
    
    # if dti_wprosper_loan is 1000000.0, remove the row

    # df.drop(axis=0) 
    # df.[x > 10]
    listings_final = listings_final[listings_final['dti_wprosper_loan'] <= 10]
    
    listings_final['loan_status'] = listings_final['loan_status'].apply(
        lambda x: 1 if x in [2, 3] else 0)
    
    start, end = re.search(r'_(\d{4})(?:\d{4})(?:to)(\d{4})', listings_path).groups()
    listings_final.to_csv(f'data/clean/{start}_{end}.csv', index=False)
    listings_final_no_encode.to_csv(f'data/clean/{start}_{end}_no_encode.csv', index=False)
