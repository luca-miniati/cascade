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
            console.log(`${listings.length} listings found.`);
            
            for (const investor of investors) {
                investor.updateNotes(currentDate);
                if (currentDate.getDate() == 1) {
                    investor.setAllocation(currentDate);
                    investor.collectPayment();
                }
                investor.callModel(listings, currentDate, endDate);
                console.log('\n');
                console.log(`Cash Balance: $${investor.currentCashBalance.toFixed(2)}`);
                console.log(`Value of Notes: $${(investor.portfolio.length * 25).toFixed(2)}`);
                console.log(`Total Portfolio Value: $${(investor.portfolio.length * 25 + investor.currentCashBalance).toFixed(2)}`);
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }
}

const backtest = new Backtest('./data/clean');

const investors = [
    new Investor([], 10000, 10000, new ProsperZero([]), 1.0)
];
const startDate = new Date(2014, 0, 1);
const endDate = new Date(2024, 11, 29);

await backtest.run(investors, startDate, endDate);
