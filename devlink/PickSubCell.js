"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./PickSubCell.module.css";

export function PickSubCell({
  as: _Component = _Builtin.Block,
  cellSrc = "Hour",
  cellClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "pickcell")}
      tag="div"
      {...cellClick}
    >
      <Label txtSrc={cellSrc} lblSz="r3" icn={false} />
    </_Component>
  );
}
