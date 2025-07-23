"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CapStkLR.module.css";

export function CapStkLR({
  as: _Component = _Builtin.Block,
  lR = true,
  lTxtSrc = "left text",
  rTxtSrc = "right text",
  capPad,
  lTxtClr = "n700",
  lTxtSz = "r4",
  rTxtClr = "n700",
  rTxtSz = "r4",
}) {
  return lR ? (
    <_Component
      className={_utils.cx(_styles, "caption-lr")}
      tag="div"
      data-cap-pad={capPad}
    >
      <_Builtin.Block className={_utils.cx(_styles, "capt-lr")} tag="div">
        <_Builtin.Block tag="div" data-clr={lTxtClr} data-fs={lTxtSz}>
          {lTxtSrc}
        </_Builtin.Block>
        <_Builtin.Block tag="div" data-clr={rTxtClr} data-fs={rTxtSz}>
          {rTxtSrc}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
