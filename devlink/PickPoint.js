"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./PickPoint.module.css";

export function PickPoint({
  as: _Component = _Builtin.Block,
  pickValueSrc = "XX",
  pickPrice = false,
  pickPriceSrc = "$0000",
  bdgGrp = false,
  bdg1 = false,
  bdg2 = false,
  bdg3 = false,
  bdg1Clr = "fs500",
  bdg2Clr = "fw500",
  bdg3Clr = "fd500",
  pickCurrent,
  pickActive = "false",
  pickClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "pickpoint_wrap")} tag="nav">
      <_Builtin.Block
        className={_utils.cx(_styles, "pickpoint_main")}
        tag="div"
        {...pickClick}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "pp-shape")}
          tag="div"
          data-pick-current={pickCurrent}
          data-pick-active={pickActive}
        >
          <Label txtSrc={pickValueSrc} lblSz="r3" icn={false} lblClr="in" />
          <Label txtSrc={pickPriceSrc} lbl={pickPrice} lblSz="r4" icn={false} />
          {bdgGrp ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "badge-collection")}
              tag="div"
            >
              {bdg1 ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "badge-cal")}
                  tag="div"
                  data-bg-clr={bdg1Clr}
                />
              ) : null}
              {bdg2 ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "badge-cal")}
                  tag="div"
                  data-bg-clr={bdg2Clr}
                />
              ) : null}
              {bdg3 ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "badge-cal")}
                  tag="div"
                  data-bg-clr={bdg3Clr}
                />
              ) : null}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
