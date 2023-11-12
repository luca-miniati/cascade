from flask import Flask
from pulp import LpProblem, LpVariable, lpSum, LpMaximize
from pulp import GLPK_CMD, PYGLPK, CPLEX_CMD, CPLEX_PY, GUROBI, GUROBI_CMD, MOSEK, XPRESS, XPRESS_PY, PULP_CBC_CMD, COIN_CMD, COINMP_DLL, CHOCO_CMD, MIPCL_CMD, SCIP_CMD, HiGHS_CMD
import pulp as pl
import math

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

optimization_solvers = {
    'GLPK_CMD' : GLPK_CMD, 
    'PYGLPK' : PYGLPK, 
    'CPLEX_CMD' : CPLEX_CMD, 
    'CPLEX_PY' : CPLEX_PY, 
    'GUROBI' : GUROBI, 
    'GUROBI_CMD' : GUROBI_CMD, 
    'MOSEK' : MOSEK, 
    'XPRESS' : XPRESS, 
    'XPRESS_PY' : XPRESS_PY, 
    'PULP_CBC_CMD' : PULP_CBC_CMD, 
    'COIN_CMD' : COIN_CMD, 
    'COINMP_DLL' : COINMP_DLL, 
    'CHOCO_CMD' : CHOCO_CMD, 
    'MIPCL_CMD' : MIPCL_CMD, 
    'SCIP_CMD' : SCIP_CMD, 
    'HiGHS_CMD' : HiGHS_CMD,
}

def get_expected_portfolio_return(portfolio):
    num_loans = len(portfolio)
    weights = [1 / num_loans] * num_loans

    portfolio_return = sum(weight * loan['expected_return'] for weight, loan in zip(weights, portfolio))
    return portfolio_return

def get_sharpe_ratio(portfolio, risk_free_rate):
    risk_buckets = get_risk_buckets()
    
    size = len(portfolio)

    mean_return = (sum(loan['expected_return'] for loan in portfolio)) / size
    risk_free_return = (1 - risk_free_rate) * mean_return

    standard_dev = math.sqrt((sum((loan['expected_return'] - mean_return)**2 for loan in portfolio)) / size)

    expected_value = sum(loan['expected_return'] * risk_buckets[loan['prosper_rating']] for loan in portfolio)

    sharpe_ratio = (expected_value - risk_free_return) / standard_dev
    
    return sharpe_ratio

def optimize_portfolio(max_loans, listings, risk_free_rate, optimization_solver='PULP_CBC_CMD', portfolio=None):
    risk_buckets = get_risk_buckets()

    model = LpProblem(name="Portfolio_Optimization", sense=LpMaximize)

    risk_adjusted_returns = [(1 - risk_buckets[entry["prosper_rating"]]) * entry["expected_return"] for entry in listings]
    
    loans = range(len(listings))
    x = LpVariable.dicts("loan", loans, cat="Binary")
    if not portfolio:
        model += lpSum(risk_adjusted_returns[i] * x[i] for i in loans)
        model += lpSum(x[i] for i in loans) <= max_loans
        model.solve(optimization_solvers[optimization_solver](msg=False))
    else:
        sharpe_ratio = get_sharpe_ratio(portfolio=portfolio, risk_free_rate=risk_free_rate)
        model += lpSum(risk_adjusted_returns[i] * x[i] for i in loans) + sharpe_ratio
        model += lpSum(x[i] for i in loans) <= max_loans
        model.solve(optimization_solvers[optimization_solver](msg=False))


    selected_loans = [listings[i]['id'] for i in loans if x[i].value() == 1]

    return selected_loans


@app.route('/optimize_portfolio_route', methods=['GET', 'POST'])
def optimize_portfolio_route(portfolio, max_loans, listings, optimization_solver, risk_free_rate):
    return optimize_portfolio(portfolio=portfolio, max_loans=max_loans, listings=listings, optimization_solver=optimization_solver, risk_free_rate=risk_free_rate)

# if __name__ == '__main__':
#     app.run()
listings = [
    {'id' : "loan1", 'prosper_rating' : "AA", 'expected_return' : 0.05},
    {'id' : "loan2", 'prosper_rating' : "A", 'expected_return' : 0.06},
    {'id' : "loan3", 'prosper_rating' : "B", 'expected_return' : 0.07},
    {'id' : "loan4", 'prosper_rating' : "C", 'expected_return' : 0.08},
    {'id' : "loan5", 'prosper_rating' : "B", 'expected_return' : 0.065},
]

portfolio = [
    {'id' : "loan6", 'prosper_rating' : "AA", 'expected_return' : 0.02},
    {'id' : "loan7", 'prosper_rating' : "A", 'expected_return' : 0.07},
    {'id' : "loan8", 'prosper_rating' : "B", 'expected_return' : 0.075},
    {'id' : "loan9", 'prosper_rating' : "C", 'expected_return' : 0.06},
    {'id' : "loan10", 'prosper_rating' : "B", 'expected_return' : 0.055},
]
solvers = ['GLPK_CMD', 'PYGLPK', 'CPLEX_CMD', 'CPLEX_PY', 'GUROBI', 'GUROBI_CMD', 'MOSEK', 'XPRESS', 'XPRESS', 'XPRESS_PY', 'PULP_CBC_CMD', 'COIN_CMD', 'COINMP_DLL', 'CHOCO_CMD', 'MIPCL_CMD', 'SCIP_CMD', 'HiGHS_CMD']

for solver in solvers:
    print(f"Using solver: {solver}")
    selected_loans = optimize_portfolio(3, listings, portfolio=portfolio, optimization_solver='PULP_CBC_CMD', risk_free_rate=0.04)
    print(f"Selected loans: {selected_loans}\n")

# selected_loans = optimize_portfolio(3, listings, portfolio=portfolio, optimization_solver='PULP_CBC_CMD', risk_free_rate=0.04)