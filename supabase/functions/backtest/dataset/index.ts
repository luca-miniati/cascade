import * as dfd from "npm:danfojs-node";

/*
    * Dataset
    * FIELDS
    * startDate: Date
        * Starting date of the backtest
    * endDate: Date
        * Ending date of the backtest
    * data: DataFrame
    * METHODS
    * get: Date -> DataFrame
*/

class Dataset {
    startDate: Date;
    endDate: Date;

    constructor(startDate: Date, endDate: Date) {
        console.log('Loading data...');

        let path: string = '';
        try {

        } catch (error) {
            if (error instanceof Deno.errors.NotFound) {
                console.log(`File ${path} not found.`)
            }
        }
    }
}
