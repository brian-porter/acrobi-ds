"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { CellProdFeat } from "./CellProdFeat";
import * as _utils from "./utils";
import _styles from "./SecBillboardGrid.module.css";

export function SecBillboardGrid({
  as: _Component = _Builtin.Block,
  sec = true,
  cellMap,
  exampleProdFeat = false,
  cellBgClr,
  gridCol = "4",
  gridGap = "32",
  gridPad = "32",
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "grid-container")}
      tag="div"
      data-grid-col={gridCol}
      data-grid-gap={gridGap}
      data-grid-pad={gridPad}
    >
      {cellMap ?? <CellProdFeat cellClr={cellBgClr} cell={exampleProdFeat} />}
    </_Component>
  ) : null;
}
