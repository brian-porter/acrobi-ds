"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GlobalClickable.module.css";

export function GlobalClickable({
  as: _Component = _Builtin.Block,
  visibility = true,
  text = "Button Text",
  click = {},

  link = {
    href: "#",
  },

  typeButtonSubmitReset = "button",
  targetBlankOpensInNewTab,
}) {
  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "g_clickable_wrap")}
      tag="div"
      {...click}
    >
      <_Builtin.Link
        className={_utils.cx(_styles, "g_clickable_link")}
        button={false}
        target={targetBlankOpensInNewTab}
        block="inline"
        options={link}
      >
        <_Builtin.DOM
          className={_utils.cx(_styles, "g_clickable_text", "u-sr-only")}
          tag="span"
        >
          {text}
        </_Builtin.DOM>
      </_Builtin.Link>
      <_Builtin.DOM
        className={_utils.cx(_styles, "g_clickable_btn")}
        tag="button"
        type={typeButtonSubmitReset}
      >
        <_Builtin.DOM
          className={_utils.cx(_styles, "g_clickable_text", "u-sr-only")}
          tag="span"
        >
          {"Button Text"}
        </_Builtin.DOM>
      </_Builtin.DOM>
    </_Component>
  ) : null;
}
