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


def drop_rows(df):
    mask = (df['loan_status_description'] == 'COMPLETED') | (df['loan_status_description'] == 'DEFAULTED')
    df = df.dropna()
    df = df.loc[mask]
    return df


def sort_by_origination_date(df):
    df = df.sort_values(by='origination_date', axis=0)
    return df


os.makedirs('data/clean', exist_ok=True)
for fn, df in tqdm(dfs.items(), ascii=True):
    df.drop(set(df.columns) - listing_columns, axis=1)
    df = drop_rows(df)
    df = sort_by_origination_date(df)

    start, end = fn.split('_')[1].split('to')
    start, end = start[:4], end[:4]
    df.to_csv(f'data/clean/{start}_{end}.csv', index=False)
