import { assert, assertEquals } from 'https://deno.land/std@0.214.0/assert/mod.ts';
import { Loan } from '../utils/index.ts';

Deno.test('Test Loan.computeTerminationDate', () => {
    const loan1 = new Loan('0', 0.0, 1, 'COMPLETED', 69.0, 100.0, new Date(1492, 0, 1), 'B');
    const loan2 = new Loan('1', 0.0, 12, 'COMPLETED', 69.0, 100.0, new Date(1492, 0, 1), 'B');
    const loan3 = new Loan('2', 0.0, 12, 'COMPLETED', 69.0, 100.0, new Date(1492, 1, 1), 'B');
    const loan4 = new Loan('3', 0.25, 60, 'DEFAULTED', 2237.49, 15000, new Date(2013, 0, 2), 'D');

    assertEquals(loan1.terminationDate.toDateString(), new Date(1492, 1, 1).toDateString());
    assertEquals(loan2.terminationDate.toDateString(), new Date(1493, 0, 1).toDateString());
    assertEquals(loan3.terminationDate.toDateString(), new Date(1493, 1, 1).toDateString());
    assertEquals(loan4.terminationDate.toDateString(), new Date(2014, 3, 1).toDateString());

});

Deno.test('Test Loan.monthlyPayment', () => {
    const l1: Loan = new Loan('0', 0.05, 36, 'DEFAULTED', 5000, 10000, new Date(2000, 0, 1), 'A');
    const l2: Loan = new Loan('0', 0.15, 24, 'DEFAULTED', 7500, 10000, new Date(), 'A');

    assert(Math.abs(l1.monthlyPayment - 0.75) < 0.01);
    assert(Math.abs(l2.monthlyPayment - 1.21) < 0.01);
});

Deno.test('Test Loan.amortizationSchedule', () => {
    const l1: Loan = new Loan('0', 0.05, 36, 'DEFAULTED', 5000, 10000, new Date(2000, 0, 1), 'A');
    const l2: Loan = new Loan('1', 0.2389, 60, 'DEFAULTED', 2237.49, 15000, new Date(2013, 0, 2), 'D');
    const l1AmortizationSchedule = {
        [new Date(2000, 1, 1).toDateString()]: [0.10, 0.65],
        [new Date(2000, 2, 1).toDateString()]: [0.10, 0.65],
        [new Date(2000, 3, 1).toDateString()]: [0.10, 0.65],
        [new Date(2000, 4, 1).toDateString()]: [0.10, 0.65],
        [new Date(2000, 5, 1).toDateString()]: [0.09, 0.66],
        [new Date(2000, 6, 1).toDateString()]: [0.09, 0.66],
        [new Date(2000, 7, 1).toDateString()]: [0.09, 0.66],
        [new Date(2000, 8, 1).toDateString()]: [0.09, 0.66],
        [new Date(2000, 9, 1).toDateString()]: [0.08, 0.67],
        [new Date(2000, 10, 1).toDateString()]: [0.08, 0.67],
        [new Date(2000, 11, 1).toDateString()]: [0.08, 0.67],
        [new Date(2001, 0, 1).toDateString()]: [0.07, 0.68],
        [new Date(2001, 1, 1).toDateString()]: [0.07, 0.68],
        [new Date(2001, 2, 1).toDateString()]: [0.07, 0.68],
        [new Date(2001, 3, 1).toDateString()]: [0.07, 0.68],
        [new Date(2001, 4, 1).toDateString()]: [0.06, 0.69],
        [new Date(2001, 5, 1).toDateString()]: [0.06, 0.69],
        [new Date(2001, 6, 1).toDateString()]: [0.06, 0.69],
        [new Date(2001, 7, 1).toDateString()]: [0.05, 0.70],
        [new Date(2001, 8, 1).toDateString()]: [0.05, 0.70],
        [new Date(2001, 9, 1).toDateString()]: [0.05, 0.70],
        [new Date(2001, 10, 1).toDateString()]: [0.05, 0.70],
        [new Date(2001, 11, 1).toDateString()]: [0.04, 0.71],
        [new Date(2002, 0, 1).toDateString()]: [0.04, 0.71],
        [new Date(2002, 1, 1).toDateString()]: [0.04, 0.71],
        [new Date(2002, 2, 1).toDateString()]: [0.03, 0.72],
        [new Date(2002, 3, 1).toDateString()]: [0.03, 0.72],
        [new Date(2002, 4, 1).toDateString()]: [0.03, 0.72],
        [new Date(2002, 5, 1).toDateString()]: [0.02, 0.73],
        [new Date(2002, 6, 1).toDateString()]: [0.02, 0.73],
        [new Date(2002, 7, 1).toDateString()]: [0.02, 0.73],
        [new Date(2002, 8, 1).toDateString()]: [0.02, 0.73],
        [new Date(2002, 9, 1).toDateString()]: [0.01, 0.74],
        [new Date(2002, 10, 1).toDateString()]: [0.01, 0.74],
        [new Date(2002, 11, 1).toDateString()]: [0.01, 0.74],
        [new Date(2003, 0, 1).toDateString()]: [0.00, 0.75],
    };

    const l2FullAmortizationSchedule = {
        [new Date(2013, 1, 1).toDateString()]: [298.63, 131.94],
        [new Date(2013, 2, 1).toDateString()]: [296.00, 134.56],
        [new Date(2013, 3, 1).toDateString()]: [293.32, 137.24],
        [new Date(2013, 4, 1).toDateString()]: [290.59, 139.98],
        [new Date(2013, 5, 1).toDateString()]: [287.80, 142.76],
        [new Date(2013, 6, 1).toDateString()]: [284.96, 145.60],
        [new Date(2013, 7, 1).toDateString()]: [282.06, 148.50],
        [new Date(2013, 8, 1).toDateString()]: [279.10, 151.46],
        [new Date(2013, 9, 1).toDateString()]: [276.09, 154.47],
        [new Date(2013, 10, 1).toDateString()]: [273.01, 157.55],
        [new Date(2013, 11, 1).toDateString()]: [269.88, 160.69],
        [new Date(2014, 0, 1).toDateString()]: [266.68, 163.89],
        [new Date(2014, 1, 1).toDateString()]: [263.41, 167.15],
        [new Date(2014, 2, 1).toDateString()]: [260.09, 170.48],
        [new Date(2014, 3, 1).toDateString()]: [256.69, 173.87],
        [new Date(2014, 4, 1).toDateString()]: [253.23, 177.33],
        [new Date(2014, 5, 1).toDateString()]: [249.70, 180.86],
        [new Date(2014, 6, 1).toDateString()]: [246.10, 184.46],
        [new Date(2014, 7, 1).toDateString()]: [242.43, 188.13],
        [new Date(2014, 8, 1).toDateString()]: [238.68, 191.88],
        [new Date(2014, 9, 1).toDateString()]: [234.86, 195.70],
        [new Date(2014, 10, 1).toDateString()]: [230.97, 199.60],
        [new Date(2014, 11, 1).toDateString()]: [226.99, 203.57],
        [new Date(2015, 0, 1).toDateString()]: [222.94, 207.62],
        [new Date(2015, 1, 1).toDateString()]: [218.81, 211.76],
        [new Date(2015, 2, 1).toDateString()]: [214.59, 215.97],
        [new Date(2015, 3, 1).toDateString()]: [210.29, 220.27],
        [new Date(2015, 4, 1).toDateString()]: [205.91, 224.66],
        [new Date(2015, 5, 1).toDateString()]: [201.43, 229.13],
        [new Date(2015, 6, 1).toDateString()]: [196.87, 233.69],
        [new Date(2015, 7, 1).toDateString()]: [192.22, 238.34],
        [new Date(2015, 8, 1).toDateString()]: [187.47, 243.09],
        [new Date(2015, 9, 1).toDateString()]: [182.64, 247.93],
        [new Date(2015, 10, 1).toDateString()]: [177.70, 252.86],
        [new Date(2015, 11, 1).toDateString()]: [172.67, 257.90],
        [new Date(2016, 0, 1).toDateString()]: [167.53, 263.03],
        [new Date(2016, 1, 1).toDateString()]: [162.29, 268.27],
        [new Date(2016, 2, 1).toDateString()]: [156.95, 273.61],
        [new Date(2016, 3, 1).toDateString()]: [151.51, 279.06],
        [new Date(2016, 4, 1).toDateString()]: [145.95, 284.61],
        [new Date(2016, 5, 1).toDateString()]: [140.28, 290.28],
        [new Date(2016, 6, 1).toDateString()]: [134.51, 296.06],
        [new Date(2016, 7, 1).toDateString()]: [128.61, 301.95],
        [new Date(2016, 8, 1).toDateString()]: [122.60, 307.96],
        [new Date(2016, 9, 1).toDateString()]: [116.47, 314.09],
        [new Date(2016, 10, 1).toDateString()]: [110.22, 320.35],
        [new Date(2016, 11, 1).toDateString()]: [103.84, 326.72],
        [new Date(2017, 0, 1).toDateString()]: [97.33, 333.23],
        [new Date(2017, 1, 1).toDateString()]: [90.70, 339.86],
        [new Date(2017, 2, 1).toDateString()]: [83.93, 346.63],
        [new Date(2017, 3, 1).toDateString()]: [77.03, 353.53],
        [new Date(2017, 4, 1).toDateString()]: [70.00, 360.57],
        [new Date(2017, 5, 1).toDateString()]: [62.82, 367.75],
        [new Date(2017, 6, 1).toDateString()]: [55.50, 375.07],
        [new Date(2017, 7, 1).toDateString()]: [48.03, 382.53],
        [new Date(2017, 8, 1).toDateString()]: [40.41, 390.15],
        [new Date(2017, 9, 1).toDateString()]: [32.65, 397.92],
        [new Date(2017, 10, 1).toDateString()]: [24.72, 405.84],
        [new Date(2017, 11, 1).toDateString()]: [16.64, 413.92],
        [new Date(2018, 0, 1).toDateString()]: [8.40, 422.16],
    };
    
    // assertEquals(l2.computeAmortizationSchedule(15000, 430.56), l2FullAmortizationSchedule);
});

