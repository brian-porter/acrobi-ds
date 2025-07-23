"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { OlIcon } from "./OlIcon";
import * as _utils from "./utils";
import _styles from "./OlSuperAction.module.css";

export function OlSuperAction({
  as: _Component = _Builtin.Block,
  act = false,
  actIcnSrc = "Addcirc",
  actClick = {},
  bdg = false,
  bdgTxtSrc = "1",
  inptStep = false,
  qty = "1",
  moreClick = {},
  lessClick = {},
  stepperMap,
  slotId = "InputStepper",
}) {
  return act ? (
    <_Component
      className={_utils.cx(_styles, "ol_superact_wrap")}
      tag="div"
      {...actClick}
    >
      <OlIcon
        icnSrc={actIcnSrc}
        bdg={bdg}
        bdgTxtSrc={bdgTxtSrc}
        icnSz="ml"
        icnDrpShdw="bold-light"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "stepper-positioning")}
        tag="div"
        id={slotId}
      >
        {stepperMap}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
