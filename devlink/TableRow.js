"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TableCell } from "./TableCell";
import * as _utils from "./utils";
import _styles from "./TableRow.module.css";

export function TableRow({
  as: _Component = _Builtin.Block,
  col1Icn = false,
  col1TxtSrc = "Label",
  col1IcnSrc = "default",
  col2 = true,
  col2Icn = false,
  col2TxtSrc = "Label",
  col2IcnSrc = "default",
  col1Align = "l",
  col2Align = "l",
  rowClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "table-row")}
      tag="div"
      {...rowClick}
    >
      <TableCell
        align={col1Align}
        txtSrc={col1TxtSrc}
        icnSrc={col1IcnSrc}
        icn={col1Icn}
      />
      <TableCell
        align={col2Align}
        txtSrc={col2TxtSrc}
        icnSrc={col2IcnSrc}
        icn={col2Icn}
        cell={col2}
      />
    </_Component>
  );
}
