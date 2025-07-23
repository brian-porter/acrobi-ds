"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalClickable } from "./GlobalClickable";
import * as _utils from "./utils";
import _styles from "./BtnMain.module.css";

export function BtnMain({
  as: _Component = _Builtin.Block,
  visibility = true,
  text = "Button Text",
  style = "Primary",

  link = {
    href: "#",
  },

  typeButtonSubmitReset = "button",
}) {
  const _styleVariantMap = {
    Primary: "",
    Secondary: "w-variant-b9d747e3-ad23-da0b-f202-a2c2154cba6f",
  };

  const _activeStyleVariant = _styleVariantMap[style];

  return visibility ? (
    <_Component
      className={_utils.cx(_styles, "btn_main_wrap", _activeStyleVariant)}
      tag="div"
    >
      <GlobalClickable
        text={text}
        link={link}
        typeButtonSubmitReset={typeButtonSubmitReset}
      />
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "btn_main_text",
          "u-text-style-main",
          _activeStyleVariant
        )}
        tag="div"
        aria-hidden="true"
      >
        {text}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
