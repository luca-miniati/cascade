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


export class Loan {
    lenderYield: number;
    term: number;

    constructor(lenderYield: number, term: number) {
        this.lenderYield = lenderYield;
        this.term = term;
    }
}


export class Listing {
    id: string;
    lenderYield: number;
    term: number;
    prosperRating: string;
    loanStatus: string;
    principalPaid: number;

    constructor(id: string, lenderYield: number, prosperRating: string, term: number,
                loanStatus: string, principalPaid: number) {
        this.id = id;
        this.lenderYield = lenderYield;
        this.prosperRating = prosperRating;
        this.term = term;
        this.loanStatus = loanStatus;
        this.principalPaid = principalPaid;
    }

    isDefaulted() {
        return this.loanStatus == 'DEFAULTED';
    }
}
