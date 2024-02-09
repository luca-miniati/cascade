import { IModel } from '../../model/index.ts';
import { Listing, Loan, OptimizationType, sameDay } from '../../utils/index.ts';

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
    portfolio: Loan[];
    initialInvestment: number;
    currentCashBalance: number;
    model: IModel;
    monthlyAllocation: number;
    dailyAllocation: number[];

    constructor(portfolio: Loan[], initialInvestment: number, currentCashBalance: number, model: IModel, monthlyAllocation: number) {
        this.portfolio = portfolio;
        this.initialInvestment = initialInvestment;
        this.currentCashBalance = currentCashBalance;
        this.model = model;
        this.monthlyAllocation = monthlyAllocation;
        this.dailyAllocation = [];
    }

    setAllocation(currentDay: Date): void {
        const daysInMonth = new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 0).getDate();
        let remainingAllocation = this.monthlyAllocation * this.currentCashBalance;
        const dailyAllocation = Array(daysInMonth).fill(0);

        let day = 0;
        while (remainingAllocation >= 25) {
            dailyAllocation[day % daysInMonth] += 1
            remainingAllocation -= 25;
            day += 1
        }

        this.dailyAllocation = dailyAllocation;
    }

    purchaseListing(listing: Listing): void {
        this.portfolio.push(
            listing.toLoan()
        );
        this.currentCashBalance -= 25;
    }

    callModel(listings: Listing[], currentDay: Date): void {
        const listingsToBuy: Listing[] = this.model.optimize(listings, this.dailyAllocation[currentDay.getDay() - 1]);
        for (const listing of listingsToBuy) {
            this.purchaseListing(listing);
        }
    }

    updateNotes(currentDay: Date): void {
        this.portfolio = this.portfolio.filter(loan => {
            !sameDay(loan.terminationDate, currentDay) 
        });
    }

    collectPayment(currentDay: Date): void {
        for (const loan of this.portfolio) {
            this.currentCashBalance += loan.monthlyPayment;
        }
    }
}
