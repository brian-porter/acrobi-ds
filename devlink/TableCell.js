"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./TableCell.module.css";

export function TableCell({
  as: _Component = _Builtin.Block,
  cell = true,
  icn = false,
  icnSrc = "default",
  txtSrc = "Label",
  align = "l",
}) {
  return cell ? (
    <_Component
      className={_utils.cx(_styles, "table-cell")}
      tag="div"
      data-align={align}
    >
      <Label icn={icn} icnSrc={icnSrc} txtSrc={txtSrc} />
    </_Component>
  ) : null;
}
