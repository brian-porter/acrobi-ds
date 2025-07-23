"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Icon } from "./Icon";
import { Headline } from "./Headline";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./EmptyBar.module.css";

export function EmptyBar({
  as: _Component = _Builtin.Block,
  empty = true,
  icnSrc = "default",
  hlineSrc = "Headline",
  subTxtSrc = "Subhead description below",
  ctaTxtSrc = "CTA Wording",
  click = {},
}) {
  return empty ? (
    <_Component
      className={_utils.cx(_styles, "g-bar-empty")}
      tag="div"
      id="Share-Empty"
      {...click}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "bar-empty-wrap")}
        tag="div"
      >
        <Icon icnSrc={icnSrc} icnClr="n300" icnSz="l" />
        <_Builtin.Block
          className={_utils.cx(_styles, "bar-headline-wrap")}
          tag="div"
        >
          <Headline
            titleSrc={hlineSrc}
            subtxtSrc={subTxtSrc}
            titleSz="r1"
            subtxtSz="r4"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "bar-headline-cta")}
            tag="div"
          >
            <Label txtSrc={ctaTxtSrc} icn={false} lblSz="r4" lblClr="f500" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
