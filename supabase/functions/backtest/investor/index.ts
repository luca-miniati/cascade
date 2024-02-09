import { IModel } from '../../model/index.ts';
import { Loan, OptimizationType, DEFAULT_PROBS } from '../../utils/index.ts';

/*
    * Investor
        * FIELDS
        * this.portfolio : Loan[]
        * this.initialInvestment: numnber
        * this.currentCashBalance : number
        * this.model : IModel
        * this.monthlyAllocation : number
        * FUNCTIONS
        * this.currentAllocation: Date -> number
        * this.callModel : Listings[], number -> Listings[]
        * this.update: Loans[] -> void
        * this.collect:  -> void
*/

export class Investor{
    portfolio : Loan[];
    initialInvestment : number;
    currentCashBalance : number;
    model : IModel;
    monthlyAllocation : number;

    constructor(portfolio : Loan[], initialInvestment : number, currentCashBalance : number, 
        model : IModel, monthlyAllocation : number){
            this.portfolio = portfolio;
            this.initialInvestment = initialInvestment;
            this.currentCashBalance = currentCashBalance;
            this.model = model;
            this.monthlyAllocation = monthlyAllocation;
    }

    currentAllocation(currentDay : Date) : number {
        // based on the monthly allocation, break into increments of 25$ and overflow if more than the days 

    }
}