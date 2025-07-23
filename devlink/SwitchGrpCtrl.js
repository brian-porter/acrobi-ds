"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TglItm } from "./TglItm";
import * as _utils from "./utils";
import _styles from "./SwitchGrpCtrl.module.css";

export function SwitchGrpCtrl({
  as: _Component = _Builtin.Block,
  tglMap,
  exampleToggleGroup = true,
  exampleTglLableSrc = "Label",
  exampleTglClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "tgl_grp")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "grp-opts")} tag="div">
        {tglMap ??
          (exampleToggleGroup ? (
            <_Builtin.Block className={_utils.cx(_styles, "example")} tag="div">
              <TglItm
                lblSrc={exampleTglLableSrc}
                tglClick={exampleTglClick}
                align="l"
              />
            </_Builtin.Block>
          ) : null)}
      </_Builtin.Block>
    </_Component>
  );
}
