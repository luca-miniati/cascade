export const DEFAULT_PROBS = {
    'AA' : 0.059844,
    'A' :  0.106875,
    'B' :  0.158608,
    'C' :  0.230475,
    'D' :  0.285390,
    'E' :  0.286738,
    'HR' : 0.341582,
}

export enum OptimizationType {
    DEFAULT,
    MAX_TOTAL_INTEREST,
    MAX_CASH_FLOW,
}

export function sameDate(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
}

export function laterDate(a: Date, b: Date): boolean {
    return a.getTime() > b.getTime();
}

export function addMonth(a: Date) {
    const currentMonth = a.getMonth();
    const newMonth = currentMonth + 1;
    if (newMonth > 11) {
        a.setMonth(0);
        a.setFullYear(a.getFullYear() + 1);
    } else {
        a.setMonth(newMonth);
    }
    return a;
}

export function firstOfTheMonth(a: Date): Date {
    return new Date(a.getFullYear(), a.getMonth(), 1);
}

abstract class P2P {
    id: string;
    lenderYield: number;
    monthlyRate: number;
    term: number;
    loanStatus: string;
    principalPaid: number;
    amountBorrowed: number;
    originationDate: Date;
    terminationDate: Date;
    prosperRating: string;

    constructor(id: string, lenderYield: number, term: number, loanStatus:string,
                principalPaid: number, amountBorrowed: number, originationDate: Date,
                prosperRating: string) {
                    this.id = id;
                    this.lenderYield = lenderYield;
                    this.monthlyRate = lenderYield / 12;
                    this.term = term;
                    this.loanStatus = loanStatus;
                    this.principalPaid = principalPaid;
                    this.amountBorrowed = amountBorrowed;
                    this.originationDate = originationDate;
                    this.prosperRating = prosperRating;
                    this.terminationDate = this.computeTerminationDate();
                }

                computeMonthlyPayment(): number {
                    return 25 * (this.monthlyRate * Math.pow(1 + this.monthlyRate, this.term)) /
                        (Math.pow(1 + this.monthlyRate, this.term) - 1);
                }

                computeTerminationDate(): Date {
                    let numPayments: number;
                    if (this.loanStatus == 'DEFAULTED') {
                        const monthlyPayment = (this.amountBorrowed *
                                                this.monthlyRate *
                                                ((1 + this.monthlyRate) ** this.term)) /
                                                (((1 + this.monthlyRate) ** this.term) - 1);
                        numPayments = Math.ceil(this.principalPaid / monthlyPayment); 
                    } else {
                        numPayments = this.term;
                    }

                    let terminationMonth = this.originationDate.getMonth() + numPayments;
                    const years = Math.floor(terminationMonth / 12);
                    terminationMonth %= 12;

                    const terminationDate = new Date(this.originationDate);
                    terminationDate.setMonth(terminationMonth)
                    terminationDate.setFullYear(this.originationDate.getFullYear() + years);

                    return terminationDate;
                }
}

export class Loan extends P2P {
    monthlyPayment: number;
    principalBalance: number;
    amortizationSchedule: { [key: string]: [number, number] };

    constructor(id: string, lenderYield: number, term: number, loanStatus:string,
                principalPaid: number, amountBorrowed: number, originationDate: Date,
                prosperRating: string) {
                    super(id, lenderYield, term, loanStatus, principalPaid, amountBorrowed,
                          originationDate, prosperRating);

                          this.monthlyPayment = this.computeMonthlyPayment();
                          this.amortizationSchedule = this.computeAmortizationSchedule();
                          this.principalBalance = 25;
                }

                computeAmortizationSchedule(): { [key: string]: [number, number] }  {
                    let currentDate = firstOfTheMonth(this.originationDate);

                    let principalBalance = 25;
                    const res: { [key: string]: [number, number] } = {};

                    for (let i = 0; i < this.term; i++) {
                        const interestPayment = parseFloat((principalBalance * this.monthlyRate).toFixed(2));
                        const principalPayment = parseFloat((this.monthlyPayment - interestPayment).toFixed(2));

                        currentDate = addMonth(currentDate);
                        res[currentDate.toDateString()] = [interestPayment, principalPayment];

                        principalBalance -= principalPayment;
                    }

                    return res;
                }
}

// const l: Loan = new Loan('0', 0.05, 36, 'DEFAULTED', 5000, 10000, new Date());
// console.log(l.monthlyPayment);
// console.log(l.monthlyPrincipal);
// console.log('originated: '+l.originationDate.toDateString());
// console.log('defaulted on: '+l.terminationDate.toDateString());
//
// const l2: Loan = new Loan('0', 0.05, 36, 'DEFAULTED', 7500, 10000, new Date());
// console.log(l2.monthlyPayment);
// console.log(l2.monthlyPrincipal);
// console.log('originated: '+l2.originationDate.toDateString());
// console.log('defaulted on: '+l2.terminationDate.toDateString());

export class Listing extends P2P {
    constructor(id: string, lenderYield: number, term: number, loanStatus: string,
                principalPaid: number, amountBorrowed: number, originationDate: Date,
                prosperRating: string) {
                    super(id, lenderYield, term, loanStatus, principalPaid, amountBorrowed, originationDate,
                          prosperRating);
                }

                toLoan() {
                    return new Loan(
                        this.id,
                        this.lenderYield,
                        this.term,
                        this.loanStatus,
                        this.principalPaid,
                        this.amountBorrowed,
                        this.originationDate,
                        this.prosperRating,
                    );
                }
}
