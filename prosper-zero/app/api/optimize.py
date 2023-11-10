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
def optimize_portfolio(max_loans, listings, portfolio=None, optimization_solver=None, objective_function=None):
    risk_buckets = get_risk_buckets()

    model = LpProblem(name="Portfolio_Optimization", sense=LpMaximize)

    risk_adjusted_returns = [(1 - risk_buckets[entry["prosper_rating"]]) * entry["expected_return"] for entry in listings]

    loans = range(len(listings))
    x = LpVariable.dicts("loan", loans, cat="Binary")

    model += lpSum(risk_adjusted_returns[i] * x[i] for i in loans)
    model += lpSum(x[i] for i in loans) <= max_loans
    model.solve()

    selected_loans = [listings[i]['id'] for i in loans if x[i].value() == 1]

    return selected_loans


@app.route('/optimize_portfolio', methods=['GET', 'POST'])
def optimize_portfolio_route(portfolio, max_loans, listings, optimization_solver, objective_function):
    risk_buckets = get_risk_buckets()

    model = LpProblem(name="Portfolio_Optimization", sense=LpMaximize)

    risk_adjusted_returns = [(1 - risk_buckets[entry["prosper_rating"]]) * entry["expected_return"] for entry in listings]

    loans = range(len(listings))
    x = LpVariable.dicts("loan", loans, cat="Binary")

    model += lpSum(risk_adjusted_returns[i] * x[i] for i in loans)
    model += lpSum(x[i] for i in loans) <= max_loans
    model.solve()

    selected_loans = [listings[i]['id'] for i in loans if x[i].value() == 1]

    return selected_loans

# if __name__ == '__main__':
#     app.run()
listings = [
    {'id' : "loan1", 'prosper_rating' : "AA", 'expected_return' : 0.05},
    {'id' : "loan2", 'prosper_rating' : "A", 'expected_return' : 0.06},
    {'id' : "loan3", 'prosper_rating' : "B", 'expected_return' : 0.08},
    {'id' : "loan4", 'prosper_rating' : "C", 'expected_return' : 0.07},
    {'id' : "loan5", 'prosper_rating' : "B", 'expected_return' : 0.065},
]
print(optimize_portfolio(3, listings=listings))