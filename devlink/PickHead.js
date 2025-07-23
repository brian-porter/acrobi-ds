"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { PickHeadNav } from "./PickHeadNav";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./PickHead.module.css";

export function PickHead({
  as: _Component = _Builtin.Block,
  leadLbl = "Month",
  trailLbl = "202X",
  prev = true,
  next = true,

  prevLink = {
    href: "#",
  },

  prevClick = {},
  primeClick = {},

  nextLink = {
    href: "#",
  },

  nextClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "pickhead_main")} tag="div">
      <PickHeadNav pickNav={prev} navClick={prevClick} />
      <_Builtin.Block
        className={_utils.cx(_styles, "pickhead-title")}
        id={_utils.cx(
          _styles,
          "w-node-_8c12530d-b606-606d-fb5b-85442db69193-97bcb793"
        )}
        tag="div"
        {...primeClick}
      >
        <Label txtSrc={leadLbl} lblSz="r2" icn={false} />
        <Label txtSrc={trailLbl} lblSz="r2" icn={false} />
      </_Builtin.Block>
      <PickHeadNav pickNav={next} navClick={nextClick} navIcnSrc="nav_right" />
    </_Component>
  );
}
