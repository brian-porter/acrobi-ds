"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Progress.module.css";

export function Progress({ as: _Component = _Builtin.Block, barValue = {} }) {
  return (
    <_Component className={_utils.cx(_styles, "progress-bar")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "progress-track")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "progress-indicator")}
          tag="div"
          {...barValue}
        />
      </_Builtin.Block>
    </_Component>
  );
}
