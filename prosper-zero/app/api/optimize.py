from flask import Flask, request
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

def optimize_portfolio(max_loans, listings, risk_free_rate, risk_weight=1, optimization_solver='PULP_CBC_CMD', portfolio=None):
    """
    Optimize a portfolio of loans using linear programming.

    Parameters:
    - max_loans (int): Maximum number of loans to select.
    - listings (list): List of loan dictionaries.
    - risk_free_rate (float): Risk-free rate of return.
    - risk_weight (float): Tunes how much you want to prioritize risk in your portfolio
    - optimization_solver (str): Solver for linear programming.
    - portfolio (list, optional): List of dictionaries representing an existing portfolio.

    Returns:
    - selected_loans (list): List of selected loan IDs.
    """
    risk_buckets = get_risk_buckets()

    model = LpProblem(name="Portfolio_Optimization", sense=LpMaximize)


    risk_adjusted_returns = [(loan["expected_return"] - (risk_weight * loan["expected_return"] * risk_buckets[loan["prosper_rating"]])) for loan in listings]
    
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
def optimize_portfolio_route():
    '''
    
    max_loans = request.args.get("max_loans")
    listings = request.args.get("listings")
    risk_free_rate = request.args.get("risk_Free_rate")
    risk_weight
    optimization_solver = request.args.get("optimization_solver")
    portfolio = request.args.get("portfolio")
    '''
    return optimize_portfolio(**request.args)

if __name__ == '__main__':
    app.run()

listings = [
    {'listing_number': 'loan1', 'prosper_rating': 'AA', 'lender_yield': 0.05},
    {'listing_number': 'loan2', 'prosper_rating': 'A', 'lender_yield': 0.06},
    {'listing_number': 'loan3', 'prosper_rating': 'B', 'lender_yield': 0.07},
    {'listing_number': 'loan4', 'prosper_rating': 'C', 'lender_yield': 0.08},
    {'listing_number': 'loan5', 'prosper_rating': 'B', 'lender_yield': 0.065},
    {'listing_number': 'loan6', 'prosper_rating': 'AA', 'lender_yield': 0.055},
    {'listing_number': 'loan7', 'prosper_rating': 'A', 'lender_yield': 0.062},
    {'listing_number': 'loan8', 'prosper_rating': 'B', 'lender_yield': 0.071},
    {'listing_number': 'loan9', 'prosper_rating': 'C', 'lender_yield': 0.078},
    {'listing_number': 'loan10', 'prosper_rating': 'B', 'lender_yield': 0.068},
    {'listing_number': 'loan11', 'prosper_rating': 'AA', 'lender_yield': 0.049},
    {'listing_number': 'loan12', 'prosper_rating': 'A', 'lender_yield': 0.058},
    {'listing_number': 'loan13', 'prosper_rating': 'B', 'lender_yield': 0.072},
    {'listing_number': 'loan14', 'prosper_rating': 'C', 'lender_yield': 0.081},
    {'listing_number': 'loan15', 'prosper_rating': 'B', 'lender_yield': 0.063},
    {'listing_number': 'loan16', 'prosper_rating': 'AA', 'lender_yield': 0.055},
    {'listing_number': 'loan17', 'prosper_rating': 'A', 'lender_yield': 0.065},
    {'listing_number': 'loan18', 'prosper_rating': 'B', 'lender_yield': 0.07},
    {'listing_number': 'loan19', 'prosper_rating': 'C', 'lender_yield': 0.075},
    {'listing_number': 'loan20', 'prosper_rating': 'B', 'lender_yield': 0.068},
    {'listing_number': 'loan21', 'prosper_rating': 'AA', 'lender_yield': 0.05},
    {'listing_number': 'loan22', 'prosper_rating': 'A', 'lender_yield': 0.059},
    {'listing_number': 'loan23', 'prosper_rating': 'B', 'lender_yield': 0.073},
    {'listing_number': 'loan24', 'prosper_rating': 'C', 'lender_yield': 0.082},
    {'listing_number': 'loan25', 'prosper_rating': 'B', 'lender_yield': 0.064},
    {'listing_number': 'loan26', 'prosper_rating': 'AA', 'lender_yield': 0.052},
    {'listing_number': 'loan27', 'prosper_rating': 'A', 'lender_yield': 0.061},
    {'listing_number': 'loan28', 'prosper_rating': 'B', 'lender_yield': 0.074},
    {'listing_number': 'loan29', 'prosper_rating': 'C', 'lender_yield': 0.083},
    {'listing_number': 'loan30', 'prosper_rating': 'B', 'lender_yield': 0.066},
    {'listing_number': 'loan31', 'prosper_rating': 'AA', 'lender_yield': 0.03},
    {'listing_number': 'loan32', 'prosper_rating': 'A', 'lender_yield': 0.068},
    {'listing_number': 'loan33', 'prosper_rating': 'B', 'lender_yield': 0.076},
    {'listing_number': 'loan34', 'prosper_rating': 'C', 'lender_yield': 0.059},
    {'listing_number': 'loan35', 'prosper_rating': 'B', 'lender_yield': 0.054},
    {'listing_number': 'loan36', 'prosper_rating': 'AA', 'lender_yield': 0.018},
    {'listing_number': 'loan37', 'prosper_rating': 'A', 'lender_yield': 0.071},
    {'listing_number': 'loan38', 'prosper_rating': 'B', 'lender_yield': 0.077},
    {'listing_number': 'loan39', 'prosper_rating': 'C', 'lender_yield': 0.063},
    {'listing_number': 'loan40', 'prosper_rating': 'B', 'lender_yield': 0.056},
    {'listing_number': 'loan41', 'prosper_rating': 'AA', 'lender_yield': 0.028},
    {'listing_number': 'loan42', 'prosper_rating': 'A', 'lender_yield': 0.073},
    {'listing_number': 'loan43', 'prosper_rating': 'B', 'lender_yield': 0.079},
    {'listing_number': 'loan44', 'prosper_rating': 'C', 'lender_yield': 0.065},
    {'listing_number': 'loan45', 'prosper_rating': 'B', 'lender_yield': 0.059},
]

portfolio = [
    {'listing_number': 'loan46', 'prosper_rating': 'AA', 'lender_yield': 0.025},
    {'listing_number': 'loan47', 'prosper_rating': 'A', 'lender_yield': 0.077},
    {'listing_number': 'loan48', 'prosper_rating': 'B', 'lender_yield': 0.082},
    {'listing_number': 'loan49', 'prosper_rating': 'C', 'lender_yield': 0.068},
    {'listing_number': 'loan50', 'prosper_rating': 'B', 'lender_yield': 0.062},
    {'listing_number': 'loan51', 'prosper_rating': 'AA', 'lender_yield': 0.022},
    {'listing_number': 'loan52', 'prosper_rating': 'A', 'lender_yield': 0.075},
    {'listing_number': 'loan53', 'prosper_rating': 'B', 'lender_yield': 0.078},
    {'listing_number': 'loan54', 'prosper_rating': 'C', 'lender_yield': 0.067},
    {'listing_number': 'loan55', 'prosper_rating': 'B', 'lender_yield': 0.061},
    {'listing_number': 'loan56', 'prosper_rating': 'AA', 'lender_yield': 0.021},
    {'listing_number': 'loan57', 'prosper_rating': 'A', 'lender_yield': 0.074},
    {'listing_number': 'loan58', 'prosper_rating': 'B', 'lender_yield': 0.077},
    {'listing_number': 'loan59', 'prosper_rating': 'C', 'lender_yield': 0.066},
    {'listing_number': 'loan60', 'prosper_rating': 'B', 'lender_yield': 0.06},
]


solvers = ['GLPK_CMD', 'PYGLPK', 'CPLEX_CMD', 'CPLEX_PY', 'GUROBI', 'GUROBI_CMD', 'MOSEK', 'XPRESS', 'XPRESS', 'XPRESS_PY', 'PULP_CBC_CMD', 'COIN_CMD', 'COINMP_DLL', 'CHOCO_CMD', 'MIPCL_CMD', 'SCIP_CMD', 'HiGHS_CMD']



selected_loans = optimize_portfolio(5, listings, portfolio=portfolio, optimization_solver='PULP_CBC_CMD', risk_free_rate=0.02, risk_weight=0.5)
print(f"Selected loans (weighted preferences): {selected_loans}")

selected_loans2 = optimize_portfolio(5, listings, portfolio=portfolio, optimization_solver='PULP_CBC_CMD', risk_free_rate=0.02)
print(f"Selected loans (unweighted preference): {selected_loans2}")