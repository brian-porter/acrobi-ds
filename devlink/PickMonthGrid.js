"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { PickPoint } from "./PickPoint";
import * as _utils from "./utils";
import _styles from "./PickMonthGrid.module.css";

export function PickMonthGrid({
  as: _Component = _Builtin.Grid,
  pickMap,
  daySrc = "XX",
  price = false,
  priceSrc = "$0000",
  bdgGrp = false,
  bdg1 = false,
  bdg2 = false,
  bdg3 = false,
  bdg1Clr = "fs500",
  bdg2Clr = "fw500",
  bdg3Clr = "fd500",
  pickCurrent,
  pickActive,

  pickLink = {
    href: "#",
  },

  pickClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "pickgrid-month")} tag="div">
      {pickMap ?? (
        <PickPoint
          pickValueSrc={daySrc}
          pickPrice={price}
          pickPriceSrc={priceSrc}
          bdgGrp={bdgGrp}
          bdg1={bdg1}
          bdg2={bdg2}
          bdg3={bdg3}
          bdg1Clr={bdg1Clr}
          bdg2Clr={bdg2Clr}
          bdg3Clr={bdg3Clr}
          pickCurrent={pickCurrent}
          pickActive={pickActive}
          pickClick={pickClick}
        />
      )}
    </_Component>
  );
}
