"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Chip } from "./Chip";
import * as _utils from "./utils";
import _styles from "./ChipCloud.module.css";

export function ChipCloud({
  as: _Component = _Builtin.Block,
  chipCloud = true,
  slotIdChip = "chip",
  chipMap,
  exampleChip = true,
  chipTxtSrc = "Chip Label",
  chipClick = {},
}) {
  return chipCloud ? (
    <_Component
      className={_utils.cx(_styles, "chip_cloud")}
      tag="div"
      id={slotIdChip}
    >
      {chipMap ?? (
        <Chip
          chipTxtSrc={chipTxtSrc}
          chip={exampleChip}
          chipClick={chipClick}
          chipIcn={false}
          chipStyle="nf"
          chipTxtSz="r3"
        />
      )}
    </_Component>
  ) : null;
}
