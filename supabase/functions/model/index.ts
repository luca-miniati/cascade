import { Loan, Listing, OptimizationType, DEFAULT_PROBS } from '../utils/index.ts';
import GLPK from 'npm:glpk.js';

/*
    * ProsperZero
        * FIELDS
        * this.portfolio : Loan[]
        * this.optimizationType: OptimizationType
        * FUNCTIONS
        * this.optimize : Listings[], allocation -> Listings[]
*/

const glpk = GLPK();

export class ProsperZero {
    portfolio: Loan[];
    optimizationType: OptimizationType;

    constructor(portfolio: Loan[], optimizationType: OptimizationType) {
        this.portfolio = portfolio;
        this.optimizationType = optimizationType;
    }

    getListingValuation(listing: Listing): number {
        switch (this.optimizationType) {
            case OptimizationType.MAX_TOTAL_INTEREST: {
                return (listing.lenderYield -
                        listing.lenderYield * DEFAULT_PROBS[listing.prosperRating]) * listing.term;
            }

            case OptimizationType.MAX_CASH_FLOW: {
                // Monthly payment
                return listing.lenderYield -
                    listing.lenderYield * DEFAULT_PROBS[listing.prosperRating];
            }

            default: {
                // add coefficients
                return listing.lenderYield -
                    listing.lenderYield * DEFAULT_PROBS[listing.prosperRating];
            }
        }
    }

    optimize(listings: Listing[], maxAllocation: number): Listing[]  {
        const numListings: number = listings.length;
        const listingBinaries: string[] = [];
        const listingVars: Object[] = [];

        for (let i = 0; i < numListings;  i++) {
            
            const id = listings[i].id;
            const val = this.getListingValuation(listings[i]);
            listingBinaries.push(id);
            listingVars.push({
                name: id,
                coef: val,
            });
        }

        const lp: Object = {
            name: 'P2P Loan Optimization',
            objective: {
                direction: glpk.GLP_MAX,
                name: 'obj',
                vars: listingVars,
            },
            subjectTo: [{
                name: 'Allocation Constraint',
                vars: listingBinaries.map(id => ({ name: id, coef: 1 })),
                bnds: {
                    type: glpk.GLP_UP,
                    ub: maxAllocation / 25,
                    lb: 0,
                },
            }],
            binaries: listingBinaries,
        }

        const res: object = glpk.solve(lp);
        const listingsToBuy: Listing[] = [];
        for (let i = 0; i < numListings; i++) {
            const id = listingBinaries[i];
            if (res['result']['vars'][id] == 1) {
                listingsToBuy.push(listings[i]);
            }
        }

        return listingsToBuy;
    }
}

const listings = [
    new Listing('0', 0.1775, 'C', 4, 'COMPLETED', 10000.0),
    new Listing('1', 0.2384, 'E', 4, 'COMPLETED', 10000.0),
    new Listing('2', 0.2254, 'D', 3, 'COMPLETED', 10000.0),
    new Listing('3', 0.1205, 'B', 3, 'COMPLETED', 10000.0),
    new Listing('4', 0.2033, 'C', 5, 'COMPLETED', 10000.0),
    new Listing('5', 0.1511, 'B', 3, 'COMPLETED', 10000.0),
    new Listing('6', 0.1961, 'C', 3, 'COMPLETED', 10000.0),
    new Listing('7', 0.1745, 'C', 2, 'COMPLETED', 10000.0),
];

const model = new ProsperZero([], OptimizationType.MAX_CASH_FLOW);
const res = model.optimize(listings, 100.0);
console.log(res);
