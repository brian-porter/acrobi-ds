"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Chip } from "./Chip";
import * as _utils from "./utils";
import _styles from "./ChipChoiceSs.module.css";

export function ChipChoiceSs({
  as: _Component = _Builtin.Block,
  sideFade = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "bar-multi-ss")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "u-barobj-vert")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "bar-chip-row")}
          tag="div"
        >
          <Chip />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "bar-chip-row")}
          tag="div"
        >
          <Chip />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "bar-chip-row")}
          tag="div"
        >
          <Chip />
        </_Builtin.Block>
      </_Builtin.Block>
      {sideFade ? (
        <_Builtin.Block className={_utils.cx(_styles, "side-fade")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "side-fade-l")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "side-fade-r")}
            tag="div"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
