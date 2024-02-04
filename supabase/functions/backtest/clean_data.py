import os
import glob
import pandas as pd

if not os.path.exists('data/raw'):
    raise FileNotFoundError('`data/raw` not found.')

fns = glob.glob('data/raw/*.csv')
dfs = [pd.read_csv(fn) for fn in fns]
