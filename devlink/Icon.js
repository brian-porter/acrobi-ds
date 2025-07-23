"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Icon.module.css";

export function Icon({
  as: _Component = _Builtin.Block,
  icn = true,
  icnSrc = "default",
  icnSz = "s",
  icnClr = "none",
  icnDrpShdw,
}) {
  return icn ? (
    <_Component
      className={_utils.cx(_styles, "icn")}
      tag="div"
      data-icn-size={icnSz}
      data-clr={icnClr}
      data-ts={icnDrpShdw}
    >
      {icnSrc}
    </_Component>
  ) : null;
}
