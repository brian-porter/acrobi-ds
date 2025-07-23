"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Spacer } from "./Spacer";
import { Chip } from "./Chip";
import * as _utils from "./utils";
import _styles from "./ChipsSs.module.css";

export function ChipsSs({
  as: _Component = _Builtin.Block,
  sideFade = true,
  cellMap,
  exampleCells = true,
  chipBase = false,
  chipAvtr = true,
  chipChipIcnSrc = "addcirc",
}) {
  return (
    <_Component className={_utils.cx(_styles, "bar-sidescroll")} tag="div">
      {exampleCells ? (
        <_Builtin.Block className={_utils.cx(_styles, "example-map")} tag="div">
          <Spacer size="16" />
          <Chip
            chipIcnSrc={chipChipIcnSrc}
            avtr={chipAvtr}
            base={chipBase}
            chip={true}
            avtrTxtSrc="Admin"
          />
          <Chip
            chipIcnSrc={chipChipIcnSrc}
            avtr={chipAvtr}
            base={chipBase}
            chip={true}
            avtrTxtSrc="Admin"
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "u-bargap-ss")} tag="div">
        {cellMap}
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
