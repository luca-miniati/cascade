import { assert } from "https://deno.land/std@0.214.0/assert/mod.ts";
import { Loan } from '../utils/index.ts';

Deno.test("Test Loan.computeTerminationDate", () => {
    const loan1 = new Loan('0', 0.0, 1, 'CHEESE', 69.0, 100.0, new Date(1492, 0, 1));
    const loan2 = new Loan('0', 0.0, 12, 'CHEESE', 69.0, 100.0, new Date(1492, 0, 1));
    const loan3 = new Loan('0', 0.0, 12, 'DEFAULTED', 69.0, 100.0, new Date(1492, 1, 1));

    assert(loan1.terminationDate.toDateString() == new Date(1492, 1, 1).toDateString());
    assert(loan2.terminationDate.toDateString() == new Date(1493, 0, 1).toDateString());
    assert(loan3.terminationDate.toDateString() == new Date(1493, 0, 1).toDateString());
});
