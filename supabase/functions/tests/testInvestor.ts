import { assert } from "https://deno.land/std@0.214.0/assert/mod.ts";
import { Investor } from '../backtest/investor/index.ts';
import { ProsperZero } from "../model/index.ts";

Deno.test("Test Investor.currentAllocation", () => {
    const investor1 = new Investor(
        [],
        9999,
        new ProsperZero([]),
        1000,
    );
    investor1.setAllocation(new Date(2014, 0, 1));

    assert(investor1.dailyAllocation[0] == 2);
});

