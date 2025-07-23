"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Icon } from "./Icon";
import * as _utils from "./utils";
import _styles from "./FtrItm.module.css";

export function FtrItm({
  as: _Component = _Builtin.Block,
  icnSrc = "Default",
  icnClr = "p500",
  lblSrc = "Label",
  lblSz = "r2",
  lblClr = "n900",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "feature_main")}
      id={_utils.cx(
        _styles,
        "w-node-_5a95b607-f02c-3ec6-32b1-77bb0d148d6a-0d148d6a"
      )}
      tag="div"
    >
      <Icon icnSrc={icnSrc} icnClr={icnClr} icnSz="xl" />
      <_Builtin.Block
        className={_utils.cx(_styles, "text-block-10")}
        tag="div"
        data-lbl-size={lblSz}
        data-clr={lblClr}
      >
        {lblSrc}
      </_Builtin.Block>
    </_Component>
  );
}
