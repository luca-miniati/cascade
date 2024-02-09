import os
import glob
import pandas as pd
from tqdm import tqdm

if not os.path.exists('data/raw'):
    raise FileNotFoundError('`.data/raw` not found. Place all `.csv` files in'
                            '`./data/raw`.')

fns = glob.glob('data/raw/*.csv')
dfs = {fn: pd.read_csv(fn) for fn in fns}

listing_columns = {
    'loan_number',
    'amount_borrowed',
    'borrower_rate',
    'prosper_rating',
    'term',
    'origination_date',
    'principal_paid',
    'loan_status_description',
}


def drop_columns(df):
    return df.drop(set(df.columns) - listing_columns, axis=1)


def drop_rows(df):
    return df.dropna()


def sort_by_origination_date(df):
    return df.sort_values(by='origination_date', axis=0)


def fix_loan_status(df):
    df = df[df['loan_status_description'] != 'CANCELLED']
    df.loc[:, 'loan_status_description'] = df['loan_status_description'] \
        .replace('CHARGEOFF', 'DEFAULTED')
    return df


os.makedirs('data/clean', exist_ok=True)
for fn, df in tqdm(dfs.items(), ascii=True):
    df = drop_columns(df)
    df = drop_rows(df)
    df = sort_by_origination_date(df)
    df = fix_loan_status(df)

    start, end = fn.split('_')[1].split('to')
    start, end = start[:4], end[:4]
    df.to_csv(f'data/clean/{start}_{end}.csv', index=False)
