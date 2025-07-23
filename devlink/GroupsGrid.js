"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./GroupsGrid.module.css";

export function GroupsGrid({
  as: _Component = _Builtin.Grid,
  groupMap,
  exampleGroup = true,
  slotId = "CardGroupData",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "grid-group-act")}
      tag="div"
      id={slotId}
    >
      {groupMap}
    </_Component>
  );
}
