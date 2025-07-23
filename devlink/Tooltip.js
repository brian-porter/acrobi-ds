"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Tooltip.module.css";

export function Tooltip({
  as: _Component = _Builtin.Block,
  txtSrc = "Tooltip copy",
  tooltip = true,
  style,
}) {
  return tooltip ? (
    <_Component
      className={_utils.cx(_styles, "tooltip")}
      tag="div"
      data-tt-style={style}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "tooltip-body")}
        tag="div"
        data-bs="xs"
      >
        <_Builtin.Block tag="div" data-clr="n000" data-fs="r3" data-lc="2">
          {txtSrc}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "arrow")} tag="div" />
    </_Component>
  ) : null;
}
