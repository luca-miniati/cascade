import { IModel } from '../../model/index.ts';
import { Listing, Loan } from '../../utils/index.ts';

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
    name: string;

    constructor(portfolio: Loan[], initialInvestment: number, currentCashBalance: number,
                model: IModel, monthlyAllocation: number, name: string) {
                    this.portfolio = portfolio;
                    this.portfolioValue = 0;
                    this.initialInvestment = initialInvestment;
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
                    this.portfolioValue += 25;
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
                    // there is no principal Active, now it's prinpal balance
                    let numTerminated = 0;
                    let currentPortfolioValue = 0;
                    const currentNotes = [];
                    let flag = false;
                    for (const loan of this.portfolio) {
                        if (!loan.isTerminated(currentDate)) {
                            currentNotes.push(loan);
                            currentPortfolioValue += loan.principalBalance;
                        } else {
                            if (loan.id == "614556") {
                                console.log("He's terminated???");
                                flag = true;
                            }
                            numTerminated += 1;
                        }
                    }

                    if (flag) {
                        console.log(currentNotes.some(loan => loan.id == "614556"));
                    }
                    this.portfolioValue = currentPortfolioValue;
                    this.portfolio = currentNotes;

                    return numTerminated;
                }

                collectPayment(currentDate: Date): number {
                    let amountCollected = 0;
                    for (const loan of this.portfolio) {
                        this.currentCashBalance += loan.monthlyPayment;
                        // const principalPayment = loan.amortizationSchedule[currentDate.toDateString()][1];
                        const currentValues = loan.amortizationSchedule[currentDate.toDateString()];
                        let principalPayment;
                        if (currentValues) {
                            principalPayment = currentValues[1];
                        } else {
                            console.log("ID: " + loan.id);
                            console.log("LOAN STATUS: " + loan.loanStatus);
                            console.log("SCHEDULE: " + loan.amortizationSchedule);
                            console.log("ORIGINATION: " + loan.originationDate);
                            console.log("TERMINATION: " + loan.terminationDate);
                            console.log("TERM: " + loan.term);
                            throw new Error("Yo what the hell");
                        }
                        loan.principalBalance -= principalPayment;
                        this.portfolioValue -= principalPayment;
                        amountCollected += loan.monthlyPayment;
                    }

                    return amountCollected;
                }
}
