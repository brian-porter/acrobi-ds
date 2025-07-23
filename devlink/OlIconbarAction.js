"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { OlIconAction } from "./OlIconAction";
import * as _utils from "./utils";
import _styles from "./OlIconbarAction.module.css";

export function OlIconbarAction({
  as: _Component = _Builtin.Block,
  icnBar = false,
  l1Icn = true,
  r1Icn = true,
  l2Icn = false,
  r2Icn = false,
  l3Icn = false,
  r3Icn = false,
  l1IcnL1Src = "default_f",
  r1IcnR1Src = "Default",
  r1IcnR1Clr = "in",

  r1IcnR1Link = {
    href: "#",
  },

  r1IcnR1Click = {},
  l2IcnL2Src = "Default",
  l2IcnL2Clr = "in",

  l2IcnL2Link = {
    href: "#",
  },

  l2IcnL2Click = {},
  r2IcnR2Src = "Default",
  r2IcnR2Clr = "in",

  r2IcnR2Link = {
    href: "#",
  },

  r2IcnR2Click = {},
  l3IcnL3Src = "Default",
  l3IcnL3Clr = "in",

  l3IcnL3Link = {
    href: "#",
  },

  l3IcnL3Click = {},
  r3IcnR3Src = "Default",
  r3IcnR3Clr = "in",

  r3IcnR3Link = {
    href: "#",
  },

  r3IcnR3Click = {},
  l1IcnL1Clr = "in",

  l1IcnL1Link = {
    href: "#",
  },

  l1IcnL1Click = {},
  l1IcnL1DrpShdw = "bold",
  l2IcnL2DrpShdw = "bold",
  l3IcnL3DrpShdw = "bold",
  r3IcnR3DrpShdw = "bold",
  r2IcnR2DrpShdw = "bold",
  r1IcnR1DrpShdw = "bold",
}) {
  return icnBar ? (
    <_Component
      className={_utils.cx(_styles, "ol-icnbar-act")}
      tag="div"
      data-clr="n000"
    >
      <_Builtin.Block className={_utils.cx(_styles, "icn_group")} tag="div">
        <OlIconAction
          icnSrc={l1IcnL1Src}
          icn={l1Icn}
          icnClick={l1IcnL1Click}
          icnClr={l1IcnL1Clr}
          icnDrpShdw={l1IcnL1DrpShdw}
        />
        <OlIconAction
          icnSrc={l2IcnL2Src}
          icn={l2Icn}
          icnClick={l2IcnL2Click}
          icnClr={l2IcnL2Clr}
          icnDrpShdw={l2IcnL2DrpShdw}
        />
        <OlIconAction
          icnSrc={l3IcnL3Src}
          icn={l3Icn}
          icnClick={l3IcnL3Click}
          icnClr={l3IcnL3Clr}
          icnDrpShdw={l3IcnL3DrpShdw}
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "icn_group")} tag="div">
        <OlIconAction
          icnSrc={r3IcnR3Src}
          icn={r3Icn}
          icnClick={r3IcnR3Click}
          icnClr={r3IcnR3Clr}
          icnDrpShdw={r3IcnR3DrpShdw}
        />
        <OlIconAction
          icnSrc={r2IcnR2Src}
          icn={r2Icn}
          icnClick={r2IcnR2Click}
          icnClr={r2IcnR2Clr}
          icnDrpShdw={r2IcnR2DrpShdw}
        />
        <OlIconAction
          icnSrc={r1IcnR1Src}
          icn={r1Icn}
          icnClick={r1IcnR1Click}
          icnClr={r1IcnR1Clr}
          icnDrpShdw={r1IcnR1DrpShdw}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
