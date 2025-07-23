"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./PickSwatch.module.css";

export function PickSwatch({
  as: _Component = _Builtin.Block,
  swatchActive = false,
  swatchClr = "n100",
  swatchClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "edalt-swatch")}
      tag="div"
      {...swatchClick}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "edalt-colorbox")}
        tag="div"
        data-bg-clr={swatchClr}
        data-clr-name=""
      />
      {swatchActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "edalt-colorselect")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
