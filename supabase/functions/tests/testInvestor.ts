import { assertEquals } from "https://deno.land/std@0.214.0/assert/mod.ts";
import { Investor } from "../backtest/investor/index.ts";
import { ProsperZero } from "../model/index.ts";

Deno.test("Test Investor.setAllocatian", () => {
    const investor1 = new Investor(
        [],
        9999,
        new ProsperZero([]),
        1.0,
        "Investor 1",
    );
    // Set allocation on first of the month
    investor1.setAllocation(new Date(2000, 0, 1));
    const dailyAllocation: number[] = [
        325,325,325,325,325,325,325,325,325,325,325,325,325,325,325,325,325,325,325,325,325,325,325,325,325,325,325,300,300,300,300
    ];

    assertEquals(investor1.dailyAllocation, dailyAllocation);
});

// Deno.test("Test Investor.currentAllocation", () => {
//     const investor1 = new Investor(
//         [],
//         10000,
//         10000,
//         new ProsperZero([]),
//         1000,
//     );
//     investor1.setAllocation(new Date(2014, 0, 1));
//
//     assert(investor1.dailyAllocation[0] == 2);
// });
