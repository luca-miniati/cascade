import { IModel } from '../../model/index.ts';
import { Listing, Loan } from '../../utils/index.ts';

/*
    * Investor
        * FIELDS
        * this.portfolio : Loan[]
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
    currentCashBalance: number;
    model: IModel;
    monthlyAllocation: number;
    dailyAllocation: number[];
    name: string;

    constructor(portfolio: Loan[], currentCashBalance: number,
                model: IModel, monthlyAllocation: number, name: string) {
                    this.portfolio = portfolio;
                    this.portfolioValue = 0;
                    this.currentCashBalance = currentCashBalance;
                    this.model = model;
                    this.monthlyAllocation = monthlyAllocation;
                    this.dailyAllocation = [];
                    this.name = name;
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
                    this.currentCashBalance -= 25;
                }

                callModel(listings: Listing[], currentDate: Date, endDate: Date): number {
                    const listingsToBuy: Listing[] = this.model.optimize(listings, this.dailyAllocation[currentDate.getDate() - 1]);
                    for (const listing of listingsToBuy) {
                        if (endDate.getTime() >= listing.terminationDate.getTime()) {
                            this.purchaseListing(listing);
                        }
                    }

                    return listingsToBuy.length;
                }

                updateNotes(currentDate: Date): number {
                    let numTerminated = 0;
                    const currentNotes = [];
                    for (const loan of this.portfolio) {
                        if (!loan.isTerminated(currentDate)) {
                            currentNotes.push(loan);
                        } else {
                            numTerminated += 1;
                        }
                    }

                    this.portfolio = currentNotes;
                    this.updatePortfolioValue();

                    return numTerminated;
                }

                updatePortfolioValue(): void {
                    let portfolioValue = 0;
                    for (const loan of this.portfolio) {
                        portfolioValue += loan.principalBalance;
                    }

                    this.portfolioValue = portfolioValue;
                }

                collectPayment(currentDate: Date): number {
                    let amountCollected = 0;
                    for (const loan of this.portfolio) {
                        this.currentCashBalance += loan.monthlyPayment;

                        const currentValues = loan.amortizationSchedule[currentDate.toDateString()];
                        loan.principalBalance -= currentValues[1];
                        amountCollected += currentValues[0];
                    }

                    this.updatePortfolioValue();

                    return amountCollected;
                }
}
