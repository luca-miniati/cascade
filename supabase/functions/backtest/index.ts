import { Dataset } from "./dataset/index.ts";
import { Investor } from "./investor/index.ts";
import { sameDate } from "../utils/index.ts";
import { ProsperZero } from "../model/index.ts";


class Backtest {
    datasetPath: string;

    constructor(datasetPath: string) {
        this.datasetPath = datasetPath
    }

    async run(investors: Investor[], startDate: Date, endDate: Date): Promise<void> {
        const currentDate = startDate;

        const dataset = new Dataset(startDate, endDate, this.datasetPath);
        await dataset.initializeData();

        while (!sameDate(currentDate, endDate)) {
            console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+');
            console.log(`Date: ${currentDate.toDateString()}`)
            const listings = dataset.getData(currentDate);
            console.log(`${listings.length} listings found.\n`);
            
            for (const investor of investors) {
                console.log(`Investor ${investor.name}`)
                const numTerminated = investor.updateNotes(currentDate);
                console.log(`${numTerminated} notes terminated.`);
                // If it's the first of the month
                if (currentDate.getDate() == 1) {
                    // Reset monthly allocation
                    investor.setAllocation(currentDate);
                    // Collect payment
                    const amountCollected = investor.collectPayment(currentDate);
                    console.log(`Collected: $${amountCollected.toFixed(2)}`);
                }

                console.log('\n');
                const numNotesPurchased = investor.callModel(listings, currentDate, endDate);
                console.log(`Number of Notes Purchased: ${numNotesPurchased}`);
                console.log(`Cash Balance: $${investor.currentCashBalance.toFixed(2)}`);
                console.log(`Value of Notes: $${(investor.portfolioValue).toFixed(2)}`);
                console.log(`Total Portfolio Value: $${(investor.portfolioValue + investor.currentCashBalance).toFixed(2)}`);
            }
            console.log('+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+\n\n');
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
}

const backtest = new Backtest('./data/clean');

const investors = [
    new Investor([], 10000, 10000, new ProsperZero([]), 1.0, 'Default')
];
const startDate = new Date(2014, 0, 1);
const endDate = new Date(2024, 11, 29);

await backtest.run(investors, startDate, endDate);
