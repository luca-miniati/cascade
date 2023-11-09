from flask import Flask
from pulp import LpProblem, LpVariable, lpSum, LpMaximize

app = Flask(__name__)

def get_risk_buckets():
    return { 
        "AA" : 0.059844,
        "A" :  0.106875,
        "B" :  0.158608,
        "C" :  0.230475,
        "D" :  0.285390,
        "E" :  0.286738,
        "HR" : 0.341582,
    }


@app.route('/optimize_portfolio')
def optimize_portfolio(portfolio, max_loans, listings, optimization_solver, objective_function):
    risk_buckets = get_risk_buckets()

    model = LpProblem(name="Portfolio_Optimization", sense=LpMaximize)

    expected_returns = [entry["expected_return"] for entry in listings]

    loans = range(len(listings))
    x = LpVariable.dicts("loan", loans, cat="Binary")

    model += lpSum(expected_returns[i] * (1 - risk_buckets[listings[i]['prosper_rating']]) * x[i] for i in loans)
    model += lpSum(x[i] for i in loans) <= max_loans
    model.solve()

    selected_loans = [listings[i]['id'] for i in loans if x[i].value() == 1]

    return selected_loans

if __name__ == '__main__':
    app.run()