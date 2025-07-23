"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./StatsBar.module.css";

export function StatsBar({
  as: _Component = _Builtin.Block,
  stats = true,
  stat1Src = "stat1",
  stat2Src = "stat2",
  stat3Src = "stat3",
  stat4Src = "stat4",
  stat2 = true,
  stat3 = true,
  stat4 = true,
  clr = "n500",
}) {
  return stats ? (
    <_Component
      className={_utils.cx(_styles, "bar-stats")}
      tag="div"
      data-clr={clr}
    >
      <_Builtin.Block className={_utils.cx(_styles, "stat")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "stat-r4")} tag="div">
          {stat1Src}
        </_Builtin.Block>
      </_Builtin.Block>
      {stat2 ? (
        <_Builtin.Block className={_utils.cx(_styles, "stat")} tag="div">
          <_Builtin.Block className={_utils.cx(_styles, "statdiv")} tag="div">
            {"|"}
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "stat-r4")} tag="div">
            {stat2Src}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {stat3 ? (
        <_Builtin.Block className={_utils.cx(_styles, "stat")} tag="div">
          <_Builtin.Block className={_utils.cx(_styles, "statdiv")} tag="div">
            {"|"}
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "stat-r4")} tag="div">
            {stat3Src}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {stat4 ? (
        <_Builtin.Block className={_utils.cx(_styles, "stat")} tag="div">
          <_Builtin.Block className={_utils.cx(_styles, "statdiv")} tag="div">
            {"|"}
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "stat-r4")} tag="div">
            {stat4Src}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
