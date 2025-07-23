"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Paragraph.module.css";

export function Paragraph({
  as: _Component = _Builtin.Block,
  pgrph = true,
  bodySrc = "Body copy here lorem ipsum dolor sit amet, consectetur",
  fontSz = "r3",
  fontClr = "n999",
  txtShad = "n",
  align = "l",
}) {
  return pgrph ? (
    <_Component
      className={_utils.cx(_styles, "pgrph-wrap")}
      tag="div"
      data-fs={fontSz}
      data-align={align}
      data-clr={fontClr}
    >
      <_Builtin.Paragraph data-ts={txtShad}>{bodySrc}</_Builtin.Paragraph>
    </_Component>
  ) : null;
}
