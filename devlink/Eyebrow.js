"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Eyebrow.module.css";

export function Eyebrow({
  as: _Component = _Builtin.DOM,
  visibility = true,
  classes = "u-mb-5",
  text = "",
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "g_eyebrow_wrap")}
      tag="div"
      data-class={classes}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "g_eyebrow_layout")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "g_eyebrow_marker")}
          tag="div"
        />
        <_Builtin.RichText
          className={_utils.cx(_styles, "g_eyebrow_text", "u-text-style-main")}
          tag="div"
          slot=""
        >
          {text}
        </_Builtin.RichText>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
