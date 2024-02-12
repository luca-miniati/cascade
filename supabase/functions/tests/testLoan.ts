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
    const l1: Loan = new Loan('0', 0.05, 36, 'DEFAULTED', 5000, 10000, new Date(2000, 0, 1), 'A');
    const l2: Loan = new Loan('0', 0.15, 24, 'DEFAULTED', 7500, 10000, new Date(), 'A');

    assert(l1.monthlyPayment == 0.75);
    assert(l2.monthlyPayment == 1.21);
});

Deno.test('Test Loan.amortizationSchedule', () => {
    const l1: Loan = new Loan('0', 0.05, 36, 'DEFAULTED', 5000, 10000, new Date(), 'A');
    const l2: Loan = new Loan('0', 0.05, 36, 'DEFAULTED', 7500, 10000, new Date(), 'A');
    const l1AmortizationSchedule = {
        [new Date(2000, 1, 1).toString()]: [0.10, 0.65],
    };

    assert(l1.amortizationSchedule == l1AmortizationSchedule);
});
