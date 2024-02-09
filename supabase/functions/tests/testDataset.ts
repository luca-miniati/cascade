import { assert } from 'https://deno.land/std@0.214.0/assert/mod.ts';
import { Dataset } from '../backtest/dataset/index.ts';
import * as dfd from 'npm:danfojs-node';
import { Listing } from '../utils/index.ts';

Deno.test('Test Dataset.getDay', async () => {
    const dataset = new Dataset(
       new Date(2014, 0, 2), new Date(2014, 0, 3), '../backtest/data/clean'
    );
    await dataset.initializeData();

    const df = await dfd.readCSV('../backtest/data/clean/2014_2015.csv');
    const rows = df.iloc({ rows: ['0:241'] });

    const manualListings: Listing[] = [];
    for (let i = 0; i < rows.shape[0]; i++) {
        const row = rows.iloc({ rows: [i] });
        const originationDate: Date = new Date(row['origination_date']['$data']);
        const id: string = row['loan_number']['$data'];
        const lenderYield: number = parseFloat(row['borrower_rate']['$data']);
        const term: number = parseInt(row['term']['$data']);
        const loanStatus: string = row['loan_status_description']['$data'];
        const amountBorrowed: number = parseFloat(row['amount_borrowed']['$data']);
        const prosperRating: string = row['prosper_rating']['$data'];
        const principalPaid: number = parseFloat(row['principal_paid']['$data']);
        const listing: Listing = new Listing(id, lenderYield, term, loanStatus, principalPaid, amountBorrowed, originationDate, prosperRating);
        manualListings.push(listing);
    }

    const datasetListings = dataset.getDay(dataset.startDate);
    assert(datasetListings.length == manualListings.length);
});
