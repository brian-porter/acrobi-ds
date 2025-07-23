"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./OlBanner.module.css";

export function OlBanner({
  as: _Component = _Builtin.Block,
  bnr = false,
  bnrIcnSrc = "Default",
  bnrTxtSrc = "Label",
  _2ndLabel = false,
  bnrSz = "m",
  bnrLoc = "bl",
  bnrClr = "n",
}) {
  return bnr ? (
    <_Component
      className={_utils.cx(_styles, "ol_bnr_wrap")}
      tag="div"
      data-bnr-size={bnrSz}
      data-bnr-loc={bnrLoc}
      data-bnr-clr={bnrClr}
    >
      <Label icnSrc={bnrIcnSrc} txtSrc={bnrTxtSrc} lblSz="r4" lblClr="n000" />
      <Label
        lbl={_2ndLabel}
        lblSz="r4"
        icnSrc="Default"
        icnLoc="r"
        lblClr="n000"
      />
    </_Component>
  ) : null;
}
