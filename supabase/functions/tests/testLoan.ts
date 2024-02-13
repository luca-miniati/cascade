import { assert, assertEquals } from 'https://deno.land/std@0.214.0/assert/mod.ts';
import { Loan } from '../utils/index.ts';

Deno.test('Test Loan.computeTerminationDate', () => {
    const loan1 = new Loan('0', 0.0, 1, 'COMPLETED', 69.0, 100.0, new Date(1492, 0, 1), 'B');
    const loan2 = new Loan('0', 0.0, 12, 'COMPLETED', 69.0, 100.0, new Date(1492, 0, 1), 'B');
    const loan3 = new Loan('0', 0.0, 12, 'COMPLETED', 69.0, 100.0, new Date(1492, 1, 1), 'B');

    assert(loan1.terminationDate.toDateString() == new Date(1492, 1, 1).toDateString());
    assert(loan2.terminationDate.toDateString() == new Date(1493, 0, 1).toDateString());
    assert(loan3.terminationDate.toDateString() == new Date(1493, 1, 1).toDateString());
});

Deno.test('Test Loan.monthlyPayment', () => {
    const l1: Loan = new Loan('0', 0.05, 36, 'DEFAULTED', 5000, 10000, new Date(2000, 0, 1), 'A');
    const l2: Loan = new Loan('0', 0.15, 24, 'DEFAULTED', 7500, 10000, new Date(), 'A');

    assert(Math.abs(l1.monthlyPayment - 0.75) < 0.01);
    assert(Math.abs(l2.monthlyPayment - 1.21) < 0.01);
});

Deno.test('Test Loan.amortizationSchedule', () => {
    const l1: Loan = new Loan('0', 0.05, 36, 'DEFAULTED', 5000, 10000, new Date(2000, 0, 1), 'A');
    // const l2: Loan = new Loan('0', 0.05, 36, 'DEFAULTED', 7500, 10000, new Date(), 'A');
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

    assertEquals(l1.amortizationSchedule, l1AmortizationSchedule);
});

