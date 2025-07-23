"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./TextfieldBtn.module.css";

export function TextfieldBtn({
  as: _Component = _Builtin.Link,
  fldBtn = true,
  fldBtnIcnSrc = "act_mic",
  fldBtnClick = {},
}) {
  return fldBtn ? (
    <_Component
      className={_utils.cx(_styles, "field-btn")}
      button={false}
      block="inline"
      options={{
        href: "#",
      }}
      {...fldBtnClick}
    >
      <Label icnSrc={fldBtnIcnSrc} txtSrc="Action" icnLoc="r" txt={false} />
    </_Component>
  ) : null;
}
