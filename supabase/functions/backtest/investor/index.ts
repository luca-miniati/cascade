import { IModel } from '../../model/index.ts';
import { Listing, Loan, sameDate, laterDate } from '../../utils/index.ts';

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
    portfolioValue: number;
    initialInvestment: number;
    currentCashBalance: number;
    model: IModel;
    monthlyAllocation: number;
    dailyAllocation: number[];

    constructor(portfolio: Loan[], initialInvestment: number, currentCashBalance: number, model: IModel, monthlyAllocation: number) {
        this.portfolio = portfolio;
        this.portfolioValue = 0;
        this.initialInvestment = initialInvestment;
        this.currentCashBalance = currentCashBalance;
        this.model = model;
        this.monthlyAllocation = monthlyAllocation;
        this.dailyAllocation = [];
    }

    setAllocation(currentDate: Date): void {
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        let remainingAllocation = this.monthlyAllocation * this.currentCashBalance;
        const dailyAllocation = Array(daysInMonth).fill(0);

        let day = 0;
        while (remainingAllocation >= 25) {
            dailyAllocation[day % daysInMonth] += 25
            remainingAllocation -= 25;
            day += 1
        }

        this.dailyAllocation = dailyAllocation;
    }

    purchaseListing(listing: Listing): void {
        this.portfolio.push(
            listing.toLoan()
        );
        this.portfolioValue += 25;
        this.currentCashBalance -= 25;
    }

    callModel(listings: Listing[], currentDate: Date, endDate: Date): void {
        const listingsToBuy: Listing[] = this.model.optimize(listings, this.dailyAllocation[currentDate.getDate() - 1]);
        for (const listing of listingsToBuy) {
            if (laterDate(endDate, listing.terminationDate)) {
                this.purchaseListing(listing);
            }
        }

        console.log(`Purchased ${listingsToBuy.length} notes.`);
    }

    updateNotes(currentDate: Date): void {
        const numLoans = this.portfolio.length;
        this.portfolio = this.portfolio.filter(
            (loan) => (!sameDate(loan.terminationDate, currentDate))
        );

        console.log(`${numLoans - this.portfolio.length} notes terminated.`);
    }

    collectPayment(): void {
        let total = 0;
        for (const loan of this.portfolio) {
            this.currentCashBalance += loan.monthlyPayment;
            this.portfolioValue -= loan.monthlyPrincipal;
            total += loan.monthlyPayment;
        }

        console.log(`Collected $${total.toFixed(2)}.`)
        console.log(`New cash balance: $${this.currentCashBalance.toFixed(2)}.`)
    }
}
