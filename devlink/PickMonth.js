"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { PickHead } from "./PickHead";
import { PickSub } from "./PickSub";
import { PickMonthGrid } from "./PickMonthGrid";
import * as _utils from "./utils";
import _styles from "./PickMonth.module.css";

export function PickMonth({
  as: _Component = _Builtin.Block,
  month = "Month",
  year = "202X",
  prevClick = {},
  monthClick = {},
  nextClick = {},
  dayMap,
}) {
  return (
    <_Component className={_utils.cx(_styles, "pickmonth")} tag="div">
      <PickHead
        leadLbl={month}
        trailLbl={year}
        prevClick={prevClick}
        primeClick={monthClick}
        nextClick={nextClick}
      />
      <PickSub />
      <PickMonthGrid pickMap={dayMap} />
    </_Component>
  );
}
