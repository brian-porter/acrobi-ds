"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GlobalBtnGroup.module.css";

export function GlobalBtnGroup({
  as: _Component = _Builtin.Block,
  groupVisibility = true,
  classes,
  slot,
}) {
  return groupVisibility ? (
    <_Component className={_utils.cx(_styles, "u-display-contents")} tag="div">
      <_Builtin.NotSupported _atom="Slot" />
    </_Component>
  ) : null;
}
