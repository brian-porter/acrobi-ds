"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { OlIconGroup } from "./OlIconGroup";
import * as _utils from "./utils";
import _styles from "./OltIconBarShow.module.css";

export function OltIconBarShow({
  as: _Component = _Builtin.Block,
  icnL1 = true,
  icnL2 = true,
  icnL3 = true,
  icnL1Src = "default_f",
  icnL2Src = "default_f",
  icnL3Src = "default_f",
  icnL1Id,
  icnL2Id,
  icnL3Id,
  icnR1 = true,
  icnR1Src = "default_f",
  icnR1Id,
  icnR2 = true,
  icnR2Src = "default_f",
  icnR2Id,
  icnR3 = true,
  icnR3Src = "default_f",
  icnR3Id,
}) {
  return (
    <_Component className={_utils.cx(_styles, "ol-iconbar")} tag="div">
      <OlIconGroup
        icn1={icnL1}
        icn1Src={icnL1Src}
        icn1Id={icnL1Id}
        icn2={icnL2}
        icn2Src={icnL2Src}
        icn2Id={icnL2Id}
        icn3={icnL3}
        icn3Src={icnL3Src}
        icn3Id={icnL3Id}
        iconGroupLocation="l"
      />
      <OlIconGroup
        icn1={icnR1}
        icn1Src={icnR1Src}
        icn1Id={icnR1Id}
        icn2={icnR2}
        icn2Src={icnR2Src}
        icn2Id={icnR2Id}
        icn3={icnR3}
        icn3Src={icnR3Src}
        icn3Id={icnR3Id}
        iconGroupLocation="r"
      />
    </_Component>
  );
}
