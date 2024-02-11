import { assert } from 'https://deno.land/std@0.214.0/assert/mod.ts';
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
    const l1: Loan = new Loan('0', 0.05, 36, 'DEFAULTED', 5000, 10000, new Date(), 'A');
    const l2: Loan = new Loan('0', 0.05, 36, 'DEFAULTED', 7500, 10000, new Date(), 'A');

    console.log(l1.monthlyPayment * l1.term);
    console.log(l1.monthlyPayment);
    console.log(l1.monthlyPrincipal);
    console.log(25 * (1 + l1.lenderYield - 0.01));
    assert(((l1.monthlyPayment * l1.term) - (l1.amountBorrowed * (1 + l1.lenderYield + 0.01))) < 0.01);
});

