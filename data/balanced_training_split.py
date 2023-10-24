import pandas as pd
import os

train_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'clean', 'mega_training.csv')


df = pd.read_csv(train_path)

loan_status_0 = df[df['loan_status'] == 0]
loan_status_1 = df[df['loan_status'] == 1]

sampled_loan_status = loan_status_0.sample(len(loan_status_1))

balanced_df = pd.concat([sampled_loan_status, loan_status_1])
balanced_df = balanced_df.sample(frac=1).reset_index(drop=True)

balanced_df.to_csv('balanced_mega_training.csv', index=False)

