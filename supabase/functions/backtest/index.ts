import { Dataset } from "./dataset/index.ts";
import { Investor } from "./investor/index.ts";
import { sameDate } from "../utils/index.ts";
import { ProsperZero } from "../model/index.ts";


class Backtest {
    datasetPath: string;
    outputPath: string;

    constructor(datasetPath: string) {
        this.datasetPath = datasetPath
        this.outputPath = "output/" + new Date().toString() + ".txt";
    }

    async run(investors: Investor[], startDate: Date, endDate: Date): Promise<void> {
        const out: string[]  = [];
        const currentDate = startDate;

        const dataset = new Dataset(startDate, endDate, this.datasetPath);
        await dataset.initializeData();

        while (!sameDate(currentDate, endDate)) {
            out.push("+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+");
            out.push(`Date: ${currentDate.toDateString()}`)
            const listings = dataset.getData(currentDate);
            out.push(`${listings.length} listings found.\n`);
            
            for (const investor of investors) {
                out.push(`Investor ${investor.name}`)
                const numTerminated = investor.updateNotes(currentDate);
                out.push(`${numTerminated} notes terminated.`);

                // If it"s the first of the month
                if (currentDate.getDate() == 1) {
                    // Reset monthly allocation
                    investor.setAllocation(currentDate);
                    // Collect payment
                    const amountCollected = investor.collectPayment(currentDate);
                    out.push(`Collected: $${amountCollected.toFixed(2)}`);
                }

                const numNotesPurchased = investor.callModel(listings, currentDate, endDate);
                out.push(`Number of Notes Purchased: ${numNotesPurchased}`);
                out.push(`Cash Balance: $${investor.currentCashBalance.toFixed(2)}`);
                out.push(`Value of Notes: $${(investor.portfolioValue).toFixed(2)}`);
                out.push(`Total Portfolio Value: $${(investor.portfolioValue + investor.currentCashBalance).toFixed(2)}`);
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        await Deno.writeTextFile(this.outputPath, out.join("\n"));
    }
}

const backtest = new Backtest("./data/clean");

const investors = [
    new Investor([], 10000, 10000, new ProsperZero([]), 1.0, "Default")
];
const startDate = new Date(2016, 0, 1);
const endDate = new Date(2024, 11, 29);

await backtest.run(investors, startDate, endDate);
