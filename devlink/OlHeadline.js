"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Headline } from "./Headline";
import * as _utils from "./utils";
import _styles from "./OlHeadline.module.css";

export function OlHeadline({
  as: _Component = _Builtin.Block,
  hline = true,
  hlineSubtxt = true,
  hlineTitleSrc = "Headline goes here",
  hlineSubtxtSrc = "Subhead description below",
  hlineLoc = "btm",
  hlineSz = "l",
  hlineAlign = "l",
}) {
  return hline ? (
    <_Component
      className={_utils.cx(_styles, "ol-headline")}
      tag="div"
      data-loc={hlineLoc}
    >
      <Headline
        titleSrc={hlineTitleSrc}
        subtxt={hlineSubtxt}
        subtxtSrc={hlineSubtxtSrc}
        sz={hlineSz}
        subtxtClr="n200"
        subTxtShdw="bold"
        titleShdw="bold"
        titleLh="lh2"
        titleClr="in"
        subtxtLc=""
      />
    </_Component>
  ) : null;
}
