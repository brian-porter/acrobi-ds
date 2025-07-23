"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import * as _utils from "./utils";
import _styles from "./ConfigOpt.module.css";

export function ConfigOpt({
  as: _Component = _Builtin.Block,
  sec = true,
  secHead = true,
  secHeadTitleIcn = false,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "default",
  secHeadTitleSrc = "ConfigName",
  secHeadAct1TxtSrc = "Cancel",
  secHeadAct1Click = {},
  conSideFade = true,
  conCellMap,
  conSlotId = "conf-opt",
  conExampleCell = true,
  exampleNameSrc = "Choice",
  exampleCellSz = "m",
  exampleCellStyl = "nl",
  exampleCellActv = "false",
  exampleCellDis = "false",
  exampleCellClick = {},
}) {
  return sec ? (
    <_Component className={_utils.cx(_styles, "item_config")} tag="div">
      <SecHead
        titleSrc={secHeadTitleSrc}
        act1={secHeadAct1}
        secHead={secHead}
        titleIcn={secHeadTitleIcn}
        titleIcnSrc={secHeadTitleIcnSrc}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1Click={secHeadAct1Click}
        titleSz="r3"
        sz="s"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "barconfig-sidescroll")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "u-barzgap-ss")}
          tag="div"
          id={conSlotId}
        >
          {conCellMap}
        </_Builtin.Block>
        {conSideFade ? (
          <_Builtin.Block className={_utils.cx(_styles, "side-fade")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "side-fade-l")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "side-fade-r")}
              tag="div"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
