import os
import pandas as pd
import glob
import re

def clean_and_merge_data(listings_path, loans_path):
    """
    Given a listings_path and a loans_path: 
    
    1. Removes rows with N/A values in critical columns
    2. Removes duplicates along the critical columns
    3. Merges listings DF with loans DF
    4. Removes rows with irrelevant loan_status values
    5. Encodes loan_status to be 0 or 1
    
    Parameters:
    - listings_path (str) - file path to listings file
    - loans_path (str) - file path to loans file
    
    Returns:
    - clean_loans_final (pandas.DataFrame) - clean data in form of a dataframe
    """
    # check if file exists
    if not os.path.exists(listings_path):
        print(f"File: {listings_path} not found")
        return
    if not os.path.exists(loans_path):
        print(f"File: {loans_path} not found")
        return    
    
    # read the files into dataframes
    listings = pd.read_csv(listings_path, encoding_errors='replace', low_memory=False)
    loans = pd.read_csv(loans_path)
    
    # dictionary to rename the listings columns to match the loans DF
    listings_rename_columns = {
        'loan_origination_date': 'origination_date',
        'listing_amount': 'amount_borrowed',
        'borrower_rate': 'borrower_rate',
        'prosper_rating': 'prosper_rating'
    }
    # making a list of the new column names
    merge_columns = list(listings_rename_columns.values())

    # renaming the columns
    listings.rename(listings_rename_columns, axis=1, inplace=True)
    
    # dropping rows that have NA as a value for one of the merge_columns
    listings.dropna(subset=merge_columns, inplace=True)
    # doing that for the loans as well
    loans.dropna(subset=merge_columns+['loan_status'], inplace=True)
    
    # removes the rows that are duplicates based on merge_columns
    listings_no_duplicates = remove_duplicate_columns(listings, merge_columns)

    # same for loans
    loans_no_duplicates = remove_duplicate_columns(loans, merge_columns)
    
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
    
    # drop the rows of listings that have NA values for any of the listings_columns
    listings_no_duplicates = listings_no_duplicates.loc[:, listings_columns].dropna()
    
    # drop all the columns except merge_columns and loan_status
    loans_no_duplicates = loans_no_duplicates[merge_columns+['loan_status']]
    
    # merges the listings dataframe on merge_columns, making sure there are still no duplicates
    clean_loans_final = pd.merge(
        listings_no_duplicates, # left DF
        loans_no_duplicates,    # right DF
        on=merge_columns,       # columns to merge on
        how='inner',            # rows with no match will not be included
        validate='1:1'          # makes sure merge is one-to-one
    )
    
    final_columns = [
        'listing_number', 
        'origination_date', 
        'borrower_rate', 
        'lender_yield', 
        'prosper_rating', 
        'loan_status'
    ]
    
    # keep only the final_columns and encode the loan status
    clean_loans_final = drop_and_encode_loan_status(clean_loans_final[final_columns])
    
    return clean_loans_final

def clean_data(loans_path):
    """
    Given a listings_path and a loans_path: 
    
    1. Removes rows with N/A values in critical columns
    2. Removes duplicates along the critical columns
    3. Merges listings DF with loans DF
    4. Removes rows with irrelevant loan_status values
    5. Encodes loan_status to be 0 or 1
    
    Parameters:
    - listings_path (str) - file path to listings file
    - loans_path (str) - file path to loans file
    
    Returns:
    - clean_loans_final (pandas.DataFrame) - clean data in form of a dataframe
    """
    if not os.path.exists(loans_path):
        print(f"File: {loans_path} not found")
        return    
    
    # read the file into a dataframe
    loans = pd.read_csv(loans_path)
    
    critical_columns = [
        'loan_number', 
        'origination_date', 
        'borrower_rate', 
        'prosper_rating', 
        'loan_status'
    ]
    
    # set lender_yield to borrower_rate - 1%
    loans['lender_yield'] = loans['borrower_rate'] - 0.01
    loans['lender_yield'] = loans['lender_yield']
    
    
    # dropping rows with N/A values in critical columns
    loans.dropna(subset=critical_columns, inplace=True)
    
    final_columns = [
        'loan_number', 
        'origination_date', 
        'lender_yield', 
        'prosper_rating', 
        'loan_status'
    ]
    
    # drop all the columns except final columns, remove duplicates, and encode the loan status
    clean_loans_final = remove_duplicate_columns(loans, critical_columns)[final_columns]
    clean_loans_final = drop_and_encode_loan_status(clean_loans_final)
    
    return clean_loans_final

def remove_duplicate_columns(df, columns):
    """
    Removes duplicates from the given dataFrame along the given columns
    
    Parameters:
    - df (pandas.DataFrame) :  dataFrame
    - columns (list of str) : columns to check for duplicates
    
    Returns:
    - df_no_duplicates (pandas.DataFrame): dataFrame with no duplicate rows
    
    """
    df_no_duplicates = df.loc[~df.duplicated(subset=columns, keep=False)]
    return df_no_duplicates

def drop_and_encode_loan_status(loans):
    """
    Drops loans with a loan status that is not completed or defaulted
    and encodes them to 0 and 1
    
    Parameters:
    - loans (pandas.DataFrame) : formatted DataFrame with a loan_status column
    
    Returns:
    - encoded_loans (pandas.DataFrame) : encoded and skimmed loans DataFrame
    
    """
    # remove all loan_status that are not one of:
    #    - 3 : "DEFAULTED"
    #    - 4 : "COMPLETED"
    loans.drop(
        loans.loc[loans['loan_status'].isin([0, 1, 2, 5, 6])].index, 
        inplace=True
    )
    
    # encoding the loan_status to have 
    #    - 0 : "COMPLETED
    #    - 1 : "DEFAULTED"    
    loans.loc[:, 'loan_status'] = loans.loan_status.apply(
        lambda x: 1 if x == 3 else 0
    )
    return loans

# define the path to the loan
all_loans_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'raw', 'Loans*.csv')
all_loans = glob.glob(all_loans_path)

# path to save csv files to
save_path =  os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data')

for loans_path in all_loans:
    # clean data
    clean_loans_data = clean_data(loans_path=loans_path)
    
    # write to CSV
    start, end = re.search(r'_(\d{4})(?:\d{4})(?:to)(\d{4})', loans_path).groups()
    clean_loans_data.to_csv(f'{save_path}/clean/{start}_{end}_backtesting.csv', index=False)
    
    print(f'WRITTED {start}-{end}_backtesting')