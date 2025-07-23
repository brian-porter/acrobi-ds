"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Badge.module.css";

export function Badge({
  as: _Component = _Builtin.Block,
  bdg = true,
  bdgClr = "fd500",
  bdgSz = "m",
  bdgCont = true,
  bdgTxt = true,
  bdgTxtSrc = "3",
  bdgIcn = false,
  bdgIcnSrc = "Default",
  bdgId,
  bdgIcnSz = "r4",
  bdgLoc = "br",
}) {
  return bdg ? (
    <_Component
      className={_utils.cx(_styles, "badge_wrap")}
      tag="div"
      data-bdg-size={bdgSz}
      data-bg-clr={bdgClr}
      data-loc={bdgLoc}
      id={bdgId}
    >
      {bdgCont ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "bdg-label_wrap")}
          tag="div"
          data-lbl-size={bdgIcnSz}
          data-loc="l"
          data-clr="n000"
          data-gap="8"
          data-ts=""
          htmlFor=""
          data-lc=""
        >
          {bdgIcn ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "icn")}
              tag="div"
              data-bdg-size={bdgIcnSz}
            >
              {bdgIcnSrc}
            </_Builtin.Block>
          ) : null}
          {bdgTxt ? (
            <_Builtin.Block className={_utils.cx(_styles, "txt")} tag="div">
              {bdgTxtSrc}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
