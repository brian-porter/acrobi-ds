"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { OlIcon } from "./OlIcon";
import * as _utils from "./utils";
import _styles from "./OlIconbar.module.css";

export function OlIconbar({
  as: _Component = _Builtin.Block,
  icnBar = true,
  icnL1 = true,
  icnL2 = true,
  icnL3 = true,
  icnR1 = true,
  icnR2 = true,
  icnR3 = true,
  icnL1Src = "Default",
  icnL2Src = "Default",
  icnL3Src = "Default",
  icnR1Src = "Default",
  icnR2Src = "Default",
  icnR3Src = "Default",
}) {
  return icnBar ? (
    <_Component className={_utils.cx(_styles, "ol_icnbar_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "icn_group")} tag="div">
        <OlIcon icnSrc={icnL1Src} icn={icnL1} icnClr="n000" icnDrpShdw="bold" />
        <OlIcon icnSrc={icnL2Src} icn={icnL2} icnClr="n000" icnDrpShdw="bold" />
        <OlIcon icnSrc={icnL3Src} icn={icnL3} icnClr="n000" icnDrpShdw="bold" />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "icn_group")} tag="div">
        <OlIcon icnSrc={icnR3Src} icn={icnR3} icnClr="n000" icnDrpShdw="bold" />
        <OlIcon icnSrc={icnR2Src} icn={icnR2} icnClr="n000" icnDrpShdw="bold" />
        <OlIcon icnSrc={icnR1Src} icn={icnR1} icnClr="n000" icnDrpShdw="bold" />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
