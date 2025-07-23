"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./FieldHelper.module.css";

export function FieldHelper({
  as: _Component = _Builtin.Block,
  fldHelp = true,
  helpL = true,
  helpR = false,
  helpLSrc = "helper copy",
  helpRSrc = "0/200",
  helpShdw,
}) {
  return fldHelp ? (
    <_Component
      className={_utils.cx(_styles, "fieldhelper")}
      tag="div"
      ts={helpShdw}
    >
      <_Builtin.Block className={_utils.cx(_styles, "help-left")} tag="div">
        <Label txtSrc={helpLSrc} lbl={helpL} lblSz="r4" icn={false} />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "help-right")} tag="div">
        <Label txtSrc={helpRSrc} lbl={helpR} lblSz="r4" icn={false} />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
