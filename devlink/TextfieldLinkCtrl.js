"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TextfieldLinkCtrl.module.css";

export function TextfieldLinkCtrl({
  as: _Component = _Builtin.Link,
  fldLinkTxtSrc = "link text",

  fldLink = {
    href: "#",
  },

  fldClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "textfield-link")}
      button={false}
      block="inline"
      options={fldLink}
      {...fldClick}
    >
      <_Builtin.Block className={_utils.cx(_styles, "r2")} tag="div">
        {fldLinkTxtSrc}
      </_Builtin.Block>
    </_Component>
  );
}
