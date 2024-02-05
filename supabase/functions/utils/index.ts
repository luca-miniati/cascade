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

/*
    * Loan
        * FIELDS
        * id: string
        * lenderYield: number
        * term: number
        * loanStatus: string
        * principalPaid: number
        * amountBorrowed: number
        * originationDate: Date
        * terminationDate: number
        * METHODS
        * computeTerminationDate: Date
*/

export class Loan {
    id: string;
    lenderYield: number;
    term: number;
    loanStatus: string;
    principalPaid: number;
    amountBorrowed: number;
    originationDate: Date;
    terminationDate: Date;

    constructor(id: string, lenderYield: number, term: number, loanStatus:string,
                principalPaid: number, amountBorrowed: number, originationDate: Date) {
                    this.id = id;
                    this.lenderYield = lenderYield;
                    this.term = term;
                    this.loanStatus = loanStatus;
                    this.principalPaid = principalPaid;
                    this.amountBorrowed = amountBorrowed;
                    this.originationDate = originationDate;
                    this.terminationDate = this.computeTerminationDate();
                }

    computeTerminationDate(): Date {
        let numPayments: number;
        if (this.loanStatus == 'DEFAULTED') {
            const monthlyPayment = this.amountBorrowed / this.term;
            const monthlyRate = (this.lenderYield + 1.0) / 12;
            numPayments = Math.floor(
                Math.log(monthlyPayment / (monthlyPayment - (this.amountBorrowed * monthlyRate))) /
                    Math.log(1 + monthlyRate));
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

/*
    * Listing
        * FIELDS
        * id: string
        * lenderYield: number
        * term: number
        * loanStatus: string
        * amountBorrowed: number
        * originationDate: Date
        * prosperRating: string
*/

export class Listing {
    id: string;
    lenderYield: number;
    term: number;
    loanStatus: string;
    amountBorrowed: number;
    originationDate: Date;
    prosperRating: string;

    constructor(id: string, lenderYield: number, term: number, loanStatus:string,
                amountBorrowed: number, originationDate: Date,
                prosperRating: string) {
                    this.id = id;
                    this.lenderYield = lenderYield;
                    this.term = term;
                    this.loanStatus = loanStatus;
                    this.amountBorrowed = amountBorrowed;
                    this.originationDate = originationDate;
                    this.prosperRating = prosperRating;
                }

    isDefaulted() {
        return this.loanStatus == 'DEFAULTED';
    }
}
