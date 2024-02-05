import os
import glob
import pandas as pd
import tqdm

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
    df.drop(set(df.columns) - listing_columns, axis=1, inplace=True)


def drop_rows(df):
    df.dropna()


def sort_by_origination_date(df):
    df.sort_values(by='origination_date', axis=0, inplace=True)


for fn, df in tqdm(dfs.items()):
    drop_columns(df)
    drop_rows(df)
    sort_by_origination_date(df)

    start, end = fn.split('_')[1].split('to')
    start, end = start[:4], end[:4]
    df.to_csv(f'{start}_{end}')
