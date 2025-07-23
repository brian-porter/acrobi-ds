"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { MenuItem } from "./MenuItem";
import * as _utils from "./utils";
import _styles from "./AcrdSecSub.module.css";

export function AcrdSecSub({
  as: _Component = _Builtin.Block,
  secSub = true,
  secSubIcn = "default",
  secSubName = "Sub-Section",
  secSubClick = {},
  secSubOn = false,
}) {
  return secSub ? (
    <_Component className={_utils.cx(_styles, "acrd_sec-sub")} tag="div">
      <MenuItem
        pTitleSrc={secSubName}
        lIcnSrc={secSubIcn}
        menuItmClick={secSubClick}
        tSelected={secSubOn}
        lIcn={true}
      />
    </_Component>
  ) : null;
}
