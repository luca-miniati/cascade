import pandas as pd
import os
import matplotlib.pyplot as plt
import numpy as np

from optimize import optimize_portfolio, portfolio
from scrape import get_current_listings
from performance import get_total_return, get_default_rate, get_prosper_ratings
from random_model import pick_random_listings

total_loans = 0
defaulted = 0
total_return = 0

listings_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'data', 'clean', '2016_2017_backtesting.csv')
data = pd.read_csv(listings_path)
data = data.loc[4000:6000]
test_listings =  data.to_dict(orient='records')
max_loans = 15

print(f"LISTING PATH:: {listings_path}")
print(f"# LISTINGS:: {len(test_listings)}")
print(f"MAX LOANS:: {max_loans}")
print("-----------------------------\n")

for r in np.arange(0.1, 5.3, 0.1):
    model_selected_loans = optimize_portfolio(max_loans=max_loans, listings=test_listings, portfolio=portfolio, risk_free_rate=0.02, risk_weight=r)
    print(f"MODEL SELECTED LOANS, risk_weight={r}")
    # print(f"loans: {model_selected_loans}")
    # print(f"total return: {get_total_return(listings=test_listings, selected_loans=model_selected_loans)}")
    # print(f"default rate: {get_default_rate(listings=test_listings, selected_loans=model_selected_loans)}")
    print(f"PR distribution: {get_prosper_ratings(listings=test_listings, selected_loans=model_selected_loans)}")
    print("-----------------------------\n")



# random_selected_loans = pick_random_listings(max_loans=max_loans, listings=test_listings)
# print("RANDOM SELECTED LOANS")
# print(f"total return: {get_total_return(listings=test_listings, selected_loans=random_selected_loans)}")
# print(f"default rate: {get_default_rate(listings=test_listings, selected_loans=random_selected_loans)}\n")
# print(f"PR distribution: {get_prosper_ratings(listings=test_listings, selected_loans=random_selected_loans)}")
# print("-----------------------------\n")

'''
risk_weights = [i/100 for i in range(1, 1001)]
model_total_returns_rw = [
    get_total_return(
        selected_loans=optimize_portfolio(max_loans=max_loans, listings=test_listings, portfolio=portfolio, risk_free_rate=0.02, risk_weight=r),
        listings=test_listings) for r in risk_weights
]

# default_rates_rw = [
#     get_default_rate(
#         listings=test_listings,
#         selected_loans=optimize_portfolio(max_loans=max_loans, listings=test_listings, portfolio=portfolio, risk_free_rate=0.02, risk_weight=r))
#         for r in risk_weights
# ]


plt.plot(risk_weights, model_total_returns_rw, label="model")
plt.xlabel('risk weight')
plt.ylabel('default rate')

plt.legend()
plt.show()
'''