"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./CapStkBadge.module.css";

export function CapStkBadge({
  as: _Component = _Builtin.Block,
  bdgTxtSrc = "0",
  bdgIcnSrc = "default",
  bdg = true,
}) {
  return bdg ? (
    <_Component className={_utils.cx(_styles, "capstk-badge")} tag="div">
      <Label txtSrc={bdgTxtSrc} icnSrc={bdgIcnSrc} lblSz="r4" lblGap="4" />
    </_Component>
  ) : null;
}
