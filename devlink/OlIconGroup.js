"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { OlIcon } from "./OlIcon";
import * as _utils from "./utils";
import _styles from "./OlIconGroup.module.css";

export function OlIconGroup({
  as: _Component = _Builtin.Block,
  icn1 = true,
  icn1Src = "default_f",
  icn1Id,
  icn2 = true,
  icn2Src = "default_f",
  icn2Id,
  icn3 = true,
  icn3Src = "default_f",
  icn3Id,
  iconGroupLocation = "l",
  icn1Clr = "in",
  icn2Clr = "in",
  icn3Clr = "in",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "icn_group")}
      tag="div"
      icngroup-loc={iconGroupLocation}
    >
      <OlIcon icn={icn1} icnSrc={icn1Src} icnClr={icn1Clr} />
      <OlIcon icn={icn2} icnSrc={icn2Src} icnClr={icn2Clr} />
      <OlIcon icn={icn3} icnSrc={icn3Src} icnClr={icn3Clr} />
    </_Component>
  );
}
