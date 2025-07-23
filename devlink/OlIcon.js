"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Icon } from "./Icon";
import { Badge } from "./Badge";
import * as _utils from "./utils";
import _styles from "./OlIcon.module.css";

export function OlIcon({
  as: _Component = _Builtin.Block,
  icn = true,
  icnSrc = "default",
  icnSz = "s",
  icnClr = "p500",
  icnDrpShdw,
  bdg = false,
  bdgTxtSrc = "1",
  bdgLoc = "rb",
}) {
  return icn ? (
    <_Component
      className={_utils.cx(_styles, "ol_icn_super_wrap")}
      tag="div"
      data-loc={bdgLoc}
    >
      <Icon
        icnSrc={icnSrc}
        icnSz={icnSz}
        icnClr={icnClr}
        icnDrpShdw={icnDrpShdw}
      />
      <Badge bdg={bdg} bdgTxtSrc={bdgTxtSrc} bdgClr="p500" />
    </_Component>
  ) : null;
}
