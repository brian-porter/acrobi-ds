"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { PickSwatch } from "./PickSwatch";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./ClrItm.module.css";

export function ClrItm({
  as: _Component = _Builtin.Block,
  itmOn = false,
  swatchClr = "n100",
  itmTitleSrc = "ColorName",
  itmClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "clritm")}
      tag="div"
      {...itmClick}
    >
      <PickSwatch swatchClr={swatchClr} />
      <Label txtSrc={itmTitleSrc} icn={false} icnLoc="r" />
      {itmOn ? (
        <_Builtin.Block className={_utils.cx(_styles, "itm-on")} tag="div" />
      ) : null}
    </_Component>
  );
}
