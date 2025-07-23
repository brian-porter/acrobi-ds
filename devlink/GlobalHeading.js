"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GlobalHeading.module.css";

export function GlobalHeading({
  as: _Component = _Builtin.RichText,
  visibility = true,
  text = "",
  classes = "u-text-style-h3 u-max-width-20ch u-child-contain",
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "g_heading")}
      tag="div"
      slot=""
      d-class={classes}
    >
      {text}
    </_Component>
  ) : null;
}
