"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Headline.module.css";

export function Headline({
  as: _Component = _Builtin.Block,
  comp = true,
  subtxt = true,
  titleSrc = "Headline",
  subtxtSrc = "Subhead description below",
  sz,
  align = "l",
  titleH = "h3",
  titleSz = "h3",
  titleClr = "n900",
  titleLh,
  titleLc,
  subtxtSz = "r3",
  subtxtClr = "n700",
  subtxtLh,
  subtxtLc = "2",
  titleShdw = "n",
  subTxtShdw = "n",
  titleAlign,
  subtxtAlign,
}) {
  return comp ? (
    <_Component
      className={_utils.cx(_styles, "headline-wrap")}
      tag="div"
      data-hl-size={sz}
      data-align={align}
    >
      <_Builtin.Heading
        className={_utils.cx(_styles, "headline")}
        tag={titleH}
        data-clr={titleClr}
        data-ts={titleShdw}
        data-fs={titleSz}
        data-lh={titleLh}
        data-lc={titleLc}
        data-align={titleAlign}
      >
        {titleSrc}
      </_Builtin.Heading>
      {subtxt ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "subtxt")}
          tag="div"
          data-clr={subtxtClr}
          data-ts={subTxtShdw}
          data-lc={subtxtLc}
          data-fs={subtxtSz}
          data-lh={subtxtLh}
          data-align={subtxtAlign}
        >
          {subtxtSrc}
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
