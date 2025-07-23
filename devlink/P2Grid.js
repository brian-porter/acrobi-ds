"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./P2Grid.module.css";

export function P2Grid({
  as: _Component = _Builtin.Grid,
  p2Grid = true,
  slotId = "obj-data",
  p2Map,
  exampleP2Object = true,
}) {
  return p2Grid ? (
    <_Component
      className={_utils.cx(_styles, "grid-peep-act")}
      tag="div"
      id={slotId}
    >
      {p2Map}
    </_Component>
  ) : null;
}
