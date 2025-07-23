"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GlobalParagraph.module.css";

export function GlobalParagraph({
  as: _Component = _Builtin.RichText,
  visibility = true,
  text = "",
  classes = "u-text-style-main u-max-width-50ch u-child-contain",
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "g_paragraph")}
      tag="div"
      slot=""
      d-class={classes}
    >
      {text}
    </_Component>
  ) : null;
}
