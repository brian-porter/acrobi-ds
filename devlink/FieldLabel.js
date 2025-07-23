"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./FieldLabel.module.css";

export function FieldLabel({
  as: _Component = _Builtin.Block,
  fldLblTop = true,
  lblSrc = "Label",
  lblFor,
  lblSz = "r4",
  lblClr = "n900",
  lblShdw,
  opt = false,
  optSrc = "required",
  optSz = "r4",
  optClr = "n300",
}) {
  return fldLblTop ? (
    <_Component
      className={_utils.cx(_styles, "fieldlabel")}
      tag="div"
      data-ts={lblShdw}
    >
      <Label
        txtSrc={lblSrc}
        lblSz={lblSz}
        lblFor={lblFor}
        lblClr={lblClr}
        icn={false}
        icnLoc="t"
        txt={true}
      />
      <Label
        txtSrc={optSrc}
        lbl={opt}
        lblSz={optSz}
        lblClr={optClr}
        icn={false}
        icnLoc="t"
        txt={true}
      />
    </_Component>
  ) : null;
}
