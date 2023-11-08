from pulp import LpProblem, LpVariable, lpSum, LpMaximize

def optimize_portfolio(expected_returns, default_probabilities, total_budget, max_loans):
    model = LpProblem(name="Portfolio_Optimization", sense=LpMaximize)

    loans = range(len(expected_returns))
    x = LpVariable.dicts("loan", loans, cat="Binary")

    model += lpSum(expected_returns[i] * (1 - default_probabilities[i]) * x[i] for i in loans)
    model += lpSum(x[i] for i in loans) <= max_loans
    model.solve()

    selected_loans = [i for i in loans if x[i].value() == 1]

    return selected_loans

expected_returns = [0.05, 0.07, 0.03, 0.06]
default_probabilities = [0.02, 0.05, 0.01, 0.03]
max_loans = 2

selected_loans = optimize_portfolio(expected_returns, default_probabilities, total_budget, max_loans)

print("Selected loans:", selected_loans)
