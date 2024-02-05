import { expandGlob } from 'https://deno.land/std@0.214.0/fs/expand_glob.ts';
import * as dfd from 'npm:danfojs-node';

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

        this.initializeData();
    }

    async initializeData() {
        console.log('Loading data...');

        const fileObjects: {
            path: string,
            name: string,
        }[] = [];
        for await (const entry of expandGlob('./data/clean/*.csv')) {
            fileObjects.push(entry);
        }
        fileObjects.sort();

        console.log(`Found ${fileObjects.length} files`)

        for (const fileObject of fileObjects) {
            this.data[fileObject['name'].slice(0, 4)] = fileObject;
            console.log(`Added ${fileObject['name'].slice(0, 4)}`);
        }
    }
}

const _dataset = new Dataset(new Date(), new Date());
