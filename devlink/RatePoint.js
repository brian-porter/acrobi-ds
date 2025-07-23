"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./RatePoint.module.css";

export function RatePoint({
  as: _Component = _Builtin.Block,
  full = false,
  half = false,
  pointClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "rating_point")}
      tag="div"
      {...pointClick}
    >
      <_Builtin.Block className={_utils.cx(_styles, "rate_bg")} tag="div">
        {"Star"}
      </_Builtin.Block>
      {half ? (
        <_Builtin.Block className={_utils.cx(_styles, "rate_half")} tag="div">
          {"Starh"}
        </_Builtin.Block>
      ) : null}
      {full ? (
        <_Builtin.Block className={_utils.cx(_styles, "rate_on")} tag="div">
          {"Star"}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
