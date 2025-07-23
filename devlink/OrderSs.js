"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Chip } from "./Chip";
import * as _utils from "./utils";
import _styles from "./OrderSs.module.css";

export function OrderSs({
  as: _Component = _Builtin.Block,
  slotId,
  sideFade = true,
  activityClick = {},
  activityActive = "false",
  usedClick = {},
  usedActive = "false",
  popClick = {},
  popActive = "false",
  dueClick = {},
  dueActive = "false",
  priorityClick = {},
  priorityActive = "false",
  nameClick = {},
  nameActive = "false",
  custom = true,
  customClick = {},
  customActive = "false",
}) {
  return (
    <_Component className={_utils.cx(_styles, "bar-sidescroll")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "u-bargap-ss")}
        tag="div"
        id={slotId}
      >
        <Chip
          chipClick={activityClick}
          chipActive={activityActive}
          chipIcnSrc="assign"
          chipTxtSrc="Activity"
        />
        <Chip
          chipClick={usedClick}
          chipActive={usedActive}
          chipTxtSrc="Last Used"
          chipIcnSrc="history"
        />
        <Chip
          chipClick={popClick}
          chipActive={popActive}
          chipIcnSrc="hot"
          chipTxtSrc="Popularity"
        />
        <Chip
          chipClick={dueClick}
          chipActive={dueActive}
          chipIcnSrc="cal"
          chipTxtSrc="Due Date"
        />
        <Chip
          chipClick={priorityClick}
          chipActive={priorityActive}
          chipIcnSrc="flag"
          chipTxtSrc="Priority"
        />
        <Chip
          chipClick={nameClick}
          chipActive={nameActive}
          chipIcnSrc="order_alpha"
          chipTxtSrc="Name"
        />
        <Chip
          chipClick={customClick}
          chipActive={customActive}
          chip={custom}
          chipIcnSrc="reorder"
          chipTxtSrc="Custom"
        />
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
