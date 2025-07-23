"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { PickSubCell } from "./PickSubCell";
import * as _utils from "./utils";
import _styles from "./PickSub.module.css";

export function PickSub({
  as: _Component = _Builtin.Block,
  cell1Src = "M",
  cell2Src = "T",
  cell3Src = "W",
  cell4Src = "T",
  cell5Src = "F",
  cell6Src = "S",
  cell7Src = "S",
  cell1Click = {},
  cell2Click = {},
  cell3Click = {},
  cell4Click = {},
  cell5Click = {},
  cell6Click = {},
  cell7Click = {},

  cell1Link = {
    href: "#",
  },

  cell2Link = {
    href: "#",
  },

  cell3Link = {
    href: "#",
  },

  cell4Link = {
    href: "#",
  },

  cell5Link = {
    href: "#",
  },

  cell6Link = {
    href: "#",
  },

  cell7Link = {
    href: "#",
  },
}) {
  return (
    <_Component className={_utils.cx(_styles, "picksubhead")} tag="div">
      <PickSubCell cellSrc={cell1Src} cellClick={cell1Click} />
      <PickSubCell cellSrc={cell2Src} cellClick={cell2Click} />
      <PickSubCell cellSrc={cell3Src} cellClick={cell3Click} />
      <PickSubCell cellSrc={cell4Src} cellClick={cell4Click} />
      <PickSubCell cellSrc={cell5Src} cellClick={cell5Click} />
      <PickSubCell cellSrc={cell6Src} cellClick={cell6Click} />
      <PickSubCell cellSrc={cell7Src} cellClick={cell7Click} />
    </_Component>
  );
}
