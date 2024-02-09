import { expandGlob } from 'https://deno.land/std@0.214.0/fs/expand_glob.ts';
import * as dfd from 'npm:danfojs-node';
import { Listing } from '../../utils/index.ts';

/*
    * Dataset
    * FIELDS
    * startDate: Date
        * Starting date of the backtest
    * endDate: Date
        * Ending date of the backtest
    * data: DataFrame
    * METHODS
    * initalizeData
    * get: Date -> DataFrame
*/

export class Dataset {
    startDate: Date;
    endDate: Date;
    data: { [key: string] : dfd.DataFrame } = {};

    constructor(startDate: Date, endDate: Date) {
        this.startDate = startDate;
        this.endDate = endDate;
    }

    async initializeData() {
        console.log(`Loading data... (Date range: ${this.startDate.getFullYear()}-${this.endDate.getFullYear()})`);

        const fileObjects: {
            path: string,
            name: string,
        }[] = [];
        for await (const entry of expandGlob('./data/clean/*.csv')) {
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
                        this.data[fileObject.name.split('.')[0]] = await dfd.readCSV(fileObject.path);
                        console.log(`Added ${fileObject.name}`);
                    })()
                );
                console.log(`Added ${fileObject.name}`);
            }
        }

        await Promise.all(loadingPromises);
        console.log('All files loaded.');
    }

    getDay(currentDay: Date): Listing[] {
        const listings: Listing[] = [];

        for (const key in this.data) {
            console.log(`Checking key: ${key}`);
            const yearRange = key.split('_').map(Number);
            const firstYear = yearRange[0];
            if (currentDay.getFullYear() === firstYear) {
                const dataFrame = this.data[key];
                for (let i = 0; i < dataFrame.shape[0]; i++) {
                    const row = dataFrame.iloc({ rows: i, columns: "*" });
                    const originationDate: Date = new Date(row.get('origination_date'));
                    if (currentDay.getTime() === originationDate.getTime()) {
                        const id: string = row.get('loan_number').toString();
                        const lenderYield: number = parseFloat(row.get('borrower_rate').toString());
                        const term: number = parseInt(row.get('term').toString());
                        const loanStatus: string = row.get('loan_status_description').toString();
                        const amountBorrowed: number = parseFloat(row.get('amount_borrowed').toString());
                        const prosperRating: string = row.get('prosper_rating').toString();
                        const listing = new Listing(id, lenderYield, term, loanStatus, amountBorrowed, originationDate, prosperRating);
                        listings.push(listing);
                    }
                }
            }
        }

        return listings;
    }
}

const dataset = new Dataset(new Date(2005, 0, 1), new Date());
await dataset.initializeData();
console.log(dataset.getDay(new Date(2005, 5, 14)));
