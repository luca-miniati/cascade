import pandas as pd
import pickle
import os
import glob
import re
import warnings
from tqdm import tqdm

warnings.filterwarnings("ignore")

listings_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'raw', 'Listings*.csv')
loans_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'raw', 'Loans*.csv')

all_listings = glob.glob(listings_path)
all_loans = glob.glob(loans_path)

for listings_path, loans_path in tqdm(zip(all_listings, all_loans)):
    if not os.path.exists(listings_path):
        print(f'File {listings_path} not found')
        continue

    if not os.path.exists(loans_path):
        print(f'File {loans_path} not found')
        continue

    listings = pd.read_csv(listings_path, encoding_errors='replace', low_memory=False)
    loans = pd.read_csv(loans_path)

    listings_rename_columns = {
        'loan_origination_date': 'origination_date',
        'listing_amount': 'amount_borrowed',
        'borrower_rate': 'borrower_rate',
        'prosper_rating': 'prosper_rating'
    }
    merge_columns = list(listings_rename_columns.values())

    listings.rename(listings_rename_columns, axis=1, inplace=True)

    listings.dropna(subset=merge_columns, inplace=True)

    loans.dropna(subset=merge_columns+['loan_status'], inplace=True)

    listings_no_duplicates = listings.loc[~listings.duplicated(
        subset=merge_columns, keep=False)]
    loans_no_duplicates = loans.loc[~loans.duplicated(
        subset=merge_columns, keep=False)]

    if listings_no_duplicates['fico_score'].isna().sum() > listings_no_duplicates['TUFicoRange'].isna().sum():
        listings_no_duplicates['fico_score'] = listings_no_duplicates.loc[:, 'TUFicoRange']
    if listings_no_duplicates['dti_wprosper_loan'].isna().sum() > listings_no_duplicates['CombinedDtiwProsperLoan'].isna().sum():
        listings_no_duplicates['dti_wprosper_loan'] = listings_no_duplicates.loc[:, 'CombinedDtiwProsperLoan']
    if listings_no_duplicates['stated_monthly_income'].isna().sum() > listings_no_duplicates['CombinedStatedMonthlyIncome'].isna().sum():
        listings_no_duplicates['stated_monthly_income'] = listings_no_duplicates.loc[:, 'CombinedStatedMonthlyIncome']

    listings_columns = [
        'listing_number',
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
        'amount_borrowed',
        'borrower_rate',
        'origination_date',
    ]
    listings_no_duplicates = listings_no_duplicates.loc[:, listings_columns].dropna()
    loans_no_duplicates = loans_no_duplicates[merge_columns+['loan_status']]

    listings_final = pd.merge(
        listings_no_duplicates,
        loans_no_duplicates,
        on=merge_columns,
        how='inner',
        validate='1:1'
    )

    listings_final['loan_status'] = listings_final['loan_status'].apply(
        lambda x: 1 if x in [2, 3] else 0)
    
    drop_cols = [
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
        'listing_monthly_payment',
        'stated_monthly_income',
        'lender_indicator',
        'occupation',
        'amount_borrowed',
        'borrower_rate',
        'origination_date',
    ]
    listings_final = listings_final.drop(drop_cols, axis=1)
    

    save_path =  os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')
    start, end = re.search(r'_(\d{4})(?:\d{4})(?:to)(\d{4})', listings_path).groups()
    listings_final.to_csv(f'{save_path}/clean/{start}_{end}_backtesting.csv', index=False)
    # listings_final_no_encode.to_csv(f'data/clean/{start}_{end}_no_encode.csv', index=False)
    print(f'WRITTEN: {start}-{end}_backtesting')

