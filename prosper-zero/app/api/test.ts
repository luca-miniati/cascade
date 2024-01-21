import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';

type Loan = {
  listing_number: string;
  prosper_rating: string;
  lender_yield: number;
  loan_status: number;
};

(() => {
  const csvFilePath = path.resolve(__dirname, 'data/clean/2013_2014_backtesting.csv');
  
  const headers = ['listing_number', 'prosper_rating', 'lender_yield', 'loan_status'];
  
  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
  
  parse(fileContent, {
    delimiter: ',',
    columns: headers,
  }, (error, result: Loan[]) => {
    if (error) {
      console.error(error);
    }
    console.log("Result", result);
  });
})();