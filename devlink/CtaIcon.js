"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CtaIcon.module.css";

export function CtaIcon({
  as: _Component = _Builtin.Block,
  heroIconName = "default",
  heroHeadlineCopy = "Headline",
  heroDescriptionCopy = "Descriptive call to action that can use up to two lines of copy in mobile format, around this much is good.",
  hideLegacy = true,
}) {
  return hideLegacy ? (
    <_Component className={_utils.cx(_styles, "hero-cta")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "icn-2xl", "u-text-p500")}
        tag="div"
      >
        {heroIconName}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "headline-l", "cc-center", "u-mb-3")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "h3")} tag="div">
          {heroHeadlineCopy}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "r3--lc2", "u-text-n700")}
          tag="div"
        >
          {heroDescriptionCopy}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
