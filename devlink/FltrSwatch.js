"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FltrSwatch.module.css";

export function FltrSwatch({
  as: _Component = _Builtin.Block,
  comp = true,
  clrSrc = "n100",
  clrName = "Color",
  selected = false,
}) {
  return comp ? (
    <_Component
      className={_utils.cx(_styles, "filter-clr")}
      id={_utils.cx(
        _styles,
        "w-node-fd3c6a9a-aef6-c389-709d-79b9ccfd39f5-ccfd39f5"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "fltr-clr-swatch")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "fltr-clr-colorbox")}
          tag="div"
          data-bg-clr={clrSrc}
        />
        {selected ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "fltr-clr-colorselect")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "filter-clr-name")}
        tag="div"
      >
        {clrName}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
