"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CapStkTxt2Row.module.css";

export function CapStkTxt2Row({
  as: _Component = _Builtin.Block,
  txt2Row = true,
  align = "c",
  capPad,
  row1Src = "Row1 wwerwt wertree ttfwertwwerwt wertree ttfwertwwerwt wertree ttfwert ",
  row1Sz = "r4",
  row1Clr = "n900",
  row1Lc = "2",
  row2 = false,
  row2Src = "Row2",
  row2Align,
  row2Sz = "r4",
  row2Clr,
  row2Lc = "1",
  row3 = false,
  row3Src = "Row3",
  row3Align = "l",
  row3Sz = "r4",
  row3Clr,
  row3Lc = "1",
}) {
  return txt2Row ? (
    <_Component
      className={_utils.cx(_styles, "capstk_wrap")}
      tag="div"
      data-align={align}
      data-cap-pad={capPad}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "row1txt")}
        tag="div"
        data-clr={row1Clr}
        data-fs={row1Sz}
        data-lc={row1Lc}
      >
        {row1Src}
      </_Builtin.Block>
      {row2 ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "row2txt")}
          tag="div"
          data-fs={row2Sz}
          data-lc={row2Lc}
          data-clr={row2Clr}
          data-obj-align={row2Align}
        >
          {row2Src}
        </_Builtin.Block>
      ) : null}
      {row3 ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "row3txt")}
          tag="div"
          data-fs={row3Sz}
          data-lc={row3Lc}
          data-clr={row3Clr}
          data-obj-align={row3Align}
        >
          {row3Src}
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
