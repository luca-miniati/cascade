import { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

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

                computeMonthlyPayment(amountBorrowed: number): number {
                    return amountBorrowed * (this.monthlyRate * Math.pow(1 + this.monthlyRate, this.term)) /
                        (Math.pow(1 + this.monthlyRate, this.term) - 1);
                }

                computeAmortizationSchedule(principalBalance: number, monthlyPayment: number):
                    { [key: string]: [number, number] }  {
                    let currentDate = firstOfTheMonth(this.originationDate);

                    const res: { [key: string]: [number, number] } = {};

                    for (let i = 0; i < this.term; i++) {
                        const interestPayment = (principalBalance * this.monthlyRate);
                        const principalPayment = (monthlyPayment - interestPayment);

                        currentDate = addMonth(currentDate);
                        res[currentDate.toDateString()] = [interestPayment, principalPayment];

                        principalBalance -= principalPayment;
                    }

                    return res;
                }

                computeTerminationDate(): Date {
                    let numPayments: number = 0;
                    if (this.loanStatus == 'DEFAULTED') {
                        const monthlyPayment = this.computeMonthlyPayment(this.amountBorrowed);
                        const fullAmortizationSchedule = this.computeAmortizationSchedule(this.amountBorrowed, monthlyPayment);
                        const firstPaymentMonth = this.originationDate.getMonth() + 1;

                        let firstPaymentDate: Date;
                        if(firstPaymentMonth == 12){
                            firstPaymentDate = new Date(this.originationDate.getFullYear() + 1, 0, 1);
                        } else {
                            firstPaymentDate = new Date(this.originationDate.getFullYear(), firstPaymentMonth, 1);
                        }

                        let paymentDate = firstPaymentDate;
                        let paidSoFar = fullAmortizationSchedule[paymentDate.toDateString()][1];

                        while (paidSoFar <= this.principalPaid) {
                            numPayments += 1;

                            const nextPaymentMonth = paymentDate.getMonth() + 1;

                            if (nextPaymentMonth == 12) {
                                paymentDate = new Date(paymentDate.getFullYear() + 1, 0, 1);
                            } else {
                                paymentDate = new Date(paymentDate.getFullYear(), nextPaymentMonth, 1);
                            }
                            paidSoFar += fullAmortizationSchedule[paymentDate.toDateString()][1];
                        }
                    } else {
                        numPayments = this.term;
                    }
                    
                    let terminationMonth = this.originationDate.getMonth() + numPayments;
                    const years = Math.floor(terminationMonth / 12);
                    terminationMonth %= 12;

                    const terminationDate = new Date(this.originationDate.getFullYear() + years, terminationMonth, 1);

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
                          this.monthlyPayment = this.computeMonthlyPayment(25);
                          this.amortizationSchedule = this.computeAmortizationSchedule(25,
                                                                            this.monthlyPayment);
                          this.principalBalance = 25;
                }

                isTerminated(currentDate: Date): boolean {
                    return currentDate.getTime() >= this.terminationDate.getTime();
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

export interface SupabaseUserRow {
	created_at: string;
	user_id: string;
	monthly_allocation: number;
	auth_key: string;
	access_token: string;
	refresh_token: string;
	expires_at: string;
	allocation_schedule: number[] | null;
}

export async function get_access_token(user_data: SupabaseUserRow, supabase: SupabaseClient) {
	if (Date.now() < new Date(user_data.expires_at).getTime() + 60000) {
		return user_data.access_token;
	} else {
		const params = new URLSearchParams();
		params.append('grant_type', 'authorization_key');
		params.append('client_id', Deno.env.get('PROSPER_CLIENT_ID') ?? '');
		params.append('client_secret', Deno.env.get('PROSPER_CLIENT_SECRET') ?? '');
		params.append('auth_key', user_data.auth_key);

		const options = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: params.toString()
		};

		try {
			const data = await fetch('https://api.prosper.com/v1/security/oauth/token', options)
				.then(res => {
					if (!res.ok) {
						throw new Error(res.statusText);
					}
					return res.json();
				});

			const expires_at = new Date(Date.now() + (data.expires_in * 1000));
			const { error } = await supabase
				.from('users')
				.update({
					access_token: data.access_token,
					refresh_token: data.refresh_token,
					expires_at: expires_at,
				})
				.eq('user_id', user_data.user_id);

			if (error) {
				throw new Error(error.message);
			}

			return data.access_token;
		} catch (error) {
			console.error(error);
			return null;
		}
	}
}

export async function get_prosper_data(access_token: string) {
	const res = await fetch(
		"https://api.prosper.com/v1/accounts/prosper/?filters=AVAILABLE_CASH",
		{
			headers: {
				"Authorization": "bearer " + access_token,
				"Accept": "application/json",
			}
		}
	);

	if (!res.ok) {
		throw new Error(res.statusText);
	}

	return res.json();
} 

export function get_days_in_month() {
	const now = new Date();
	// Init new date object with day -1
	// This automatically gets set to last day in month, which is
	// equal to the total number of days in this month
	const days_in_month = new Date(
		now.getFullYear(),
		now.getMonth() + 0,
		-1
	).getDate();

	return days_in_month;
}

export async function get_listings(access_token: string): Promise<Listing[]> {
    const listings = [];

    const options = {
        headers: {
            'Authorization': 'bearer ' + access_token,
            'Accept': 'application/json'
        }
    }


    let result_count = 25;
    let offset = 0;
    while (result_count == 25) {
        const url = 'https://api.prosper.com/listingsvc/v2/listings/?biddable=true&invested=false&investment_typeid=1&offset=' + offset;
        const res = await fetch(url, options)
        if (!res.ok) {
            throw new Error("Fuck");
        }

        const data = await res.json();
        result_count = data.result_count;
        offset += 25;

        for (const listing of data.result) {
            listings.push(
                new Listing(
                    listing.listing_number,
                    listing.lender_yield,
                    listing.listing_term,
                    listing.listing_status_reason,
                    0.0,
                    listing.listing_amount,
                    new Date(listing.listing_creation_date),
                    listing.prosper_rating
                )
            )
        }
    }

    return listings;
}

export async function purchase_notes(listings: Listing[], access_token: string): Promise<void> {
    if (listings.length == 0) {
        return;
    }

    let result_count = 100;
    let page = 0;
    while (result_count == 100) {
        const listing_bids = [];
        const listing_page = listings.slice(page * 100, (page * 100) + 100);
        for (const listing of listing_page) {
            listing_bids.push({ "bid_amount": 25.0, "listing_id": listing.id })
        }

        const url = "https://api.prosper.com/v1/orders";
        const options = {
            method: "POST",
            headers: {
                "Authorization": "bearer " + access_token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(listing_bids),
        }
        
        const res = await fetch(url, options);

        if (!res.ok) {
            throw new Error("Shit");
        }

        page += 1;
        result_count = listing_page.length;
    }
    return;
}