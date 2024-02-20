import { assert } from 'https://deno.land/std@0.214.0/assert/mod.ts';
import { expandGlob } from 'https://deno.land/std@0.214.0/fs/expand_glob.ts';
import * as dfd from 'npm:danfojs-node';
import { Listing, sameDate } from '../../utils/index.ts';

/*
    * Dataset
* FIELDS
* startDate: Date
* Starting date of the backtest
* endDate: Date
* Ending date of the backtest
* rowIndex: number
* Index in df
* data: DataFrame
* METHODS
* initalizeData
* get: Date -> DataFrame
*/

export class Dataset {
    startDate: Date;
    endDate: Date;
    rowIndex: number;
    dataKey: number;
    datasetPath: string;
    data: dfd.DataFrame;

    constructor(startDate: Date, endDate: Date, datasetPath: string) {
        this.startDate = startDate;
        this.rowIndex = 0;
        this.endDate = endDate;
        this.datasetPath = datasetPath;
        this.data = {};
        this.dataKey = '';
    }

    async initializeData() {
        console.log(`Loading data... (Date range: ${this.startDate.getFullYear()}-${this.endDate.getFullYear()})`);

        const fileObjects: {
            path: string,
            name: string,
        }[] = [];
        for await (const entry of expandGlob(this.datasetPath + '/*.csv')) {
            fileObjects.push(entry);
        }
        fileObjects.sort();

        console.log(`Found ${fileObjects.length} files:`)
        for (const fileObject of fileObjects) {
            console.log(fileObject.name);
        }

        const loadingPromises: Promise<void>[] = [];
        for (const fileObject of fileObjects) {
            const yearRange = fileObject.name.split('.')[0].split('_').map(Number); // Extract start and end years from file name
            const fileStartDate = new Date(yearRange[0], 0, 1); // Assuming the start date is January 1st of the year
            const fileEndDate = new Date(yearRange[1], 11, 31); // Assuming the end date is December 31st of the year

            // Check if the file's date range overlaps with the desired range
            if (fileStartDate <= this.endDate && fileEndDate >= this.startDate) {
                loadingPromises.push(
                    (async () => {
                        this.data[fileObject.name.split('.')[0]] = await dfd.readCSV(fileObject.path) as dfd.DataFrame;
                    })()
                );
                console.log(`Added ${fileObject.name}`);
            }
        }

        console.log('All files loaded.\n');
        this.data = dfd.concat({ dfList: this.data, axis: 0 });
    }

    getData(currentDate: Date): Listing[] {
        assert(
            sameDate(currentDate,
                     new Date(this.data.iloc[this.rowIndex]['origination_date']['$data']))
        );

        const listings: Listing[] = [];

        for (let i = this.rowIndex; i < this.data.shape[0]; i++) {
            const row = this.data.iloc({ rows: [i] });
            const originationDate: Date = new Date(row['origination_date']['$data']);
            if (sameDate(currentDate, originationDate)) {
                const id: string = row['loan_number']['$data'][0].toString();
                const lenderYield: number = parseFloat(row['borrower_rate']['$data']);
                const term: number = parseInt(row['term']['$data']);
                const loanStatus: string = row['loan_status_description']['$data'];
                const amountBorrowed: number = parseFloat(row['amount_borrowed']['$data']);
                const prosperRating: string = row['prosper_rating']['$data'];
                const principalPaid: number = parseFloat(row['principal_paid']['$data']);
                const listing = new Listing(id, lenderYield, term, loanStatus, principalPaid,
                                            amountBorrowed, originationDate, prosperRating);
                listings.push(listing);
            }
        }

        return listings;
    }
}
