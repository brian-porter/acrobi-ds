"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Icon } from "./Icon";
import * as _utils from "./utils";
import _styles from "./InputStepper.module.css";

export function InputStepper({
  as: _Component = _Builtin.Block,
  inptStep = true,
  id = "InputStepper",
  qty = "0",
  valueBgClr,
  inpstepBg = "p500",
  inptStepIcnClr = "n000",
  inptStepOri = "h",
  inptStepShdw = "xs",
  valueTxtClr = "w",
  moreClick = {},
  lessClick = {},
}) {
  return inptStep ? (
    <_Component
      className={_utils.cx(_styles, "inpstep_wrap")}
      tag="div"
      data-bg-clr={inpstepBg}
      data-clr={inptStepIcnClr}
      data-step-ori={inptStepOri}
      data-value-clr={valueTxtClr}
      data-bs={inptStepShdw}
      id={id}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "inpstep-click")}
        tag="div"
        {...moreClick}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "inpstep-btn")}
          tag="div"
          fs-inputcounter-element="increment"
          role="button"
          aria-label="Increment input value"
          tabIndex="0"
          aria-controls="fs-inputcounter-1-input"
        >
          <Icon icnSrc="Add" icnSz="sm" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "inpstep-value")}
        tag="div"
        fs-inputcounter-element="input"
        fs-inputcounter-initial=""
        data-bg-clr={valueBgClr}
        id="fs-inputcounter-1-input"
      >
        <_Builtin.Block className={_utils.cx(_styles, "inpstep-qty")} tag="div">
          {qty}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "inpstep-click")}
        tag="div"
        {...lessClick}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "inpstep-btn")}
          tag="div"
          fs-inputcounter-element="decrement"
          role="button"
          aria-label="Decrement input value"
          tabIndex="0"
          aria-controls="fs-inputcounter-1-input"
        >
          <Icon icnSrc="Minus" icnSz="sm" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
