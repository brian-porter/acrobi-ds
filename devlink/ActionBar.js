"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import * as _utils from "./utils";
import _styles from "./ActionBar.module.css";

export function ActionBar({
  as: _Component = _Builtin.Block,
  act1 = false,
  act2 = false,
  act3 = false,
  act1Txt = true,
  act1Icn = false,
  act2Txt = false,
  act2Icn = true,
  act3Txt = false,
  act3Icn = true,
  act1IcnSrc = "default",
  act1TxtSrc = "Action1",
  act1Styl = "ft",
  act1Clr = "in",
  act1IcnLoc = "l",
  act2IcnSrc = "default",
  act2TxtSrc = "Action2",
  act2IcnLoc = "l",
  act2Styl = "nt",
  act2Clr = "in",
  act3IcnSrc = "default",
  act3TxtSrc = "Action3",
  act3IcnLoc = "l",
  act1Click = {},
  act2Click = {},
  act3Click = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "action-bar-r")} tag="div">
      <Button
        btnTxt={act3Txt}
        btnTxtSrc={act3TxtSrc}
        btnIcnSrc={act3IcnSrc}
        btnIcn={act3Icn}
        btn={act3}
        btnClick={act3Click}
        btnIcnLoc={act3IcnLoc}
        btnStyl="nt"
        lblSz="r2"
        btnSz="m"
      />
      <Button
        btnTxtSrc={act2TxtSrc}
        btnTxt={act2Txt}
        btnIcnSrc={act2IcnSrc}
        btnIcn={act2Icn}
        btn={act2}
        btnClick={act2Click}
        btnIcnLoc={act2IcnLoc}
        btnStyl={act2Styl}
        lblClr={act2Clr}
        btnSz="m"
        lblSz="r2"
      />
      <Button
        btnStyl={act1Styl}
        btnIcn={act1Icn}
        btnTxtSrc={act1TxtSrc}
        btnTxt={act1Txt}
        btnIcnSrc={act1IcnSrc}
        btn={act1}
        btnClick={act1Click}
        lblClr={act1Clr}
        btnIcnLoc={act1IcnLoc}
        btnSz="m"
        lblSz="r2"
      />
    </_Component>
  );
}
