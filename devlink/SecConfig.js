"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ConfigOpt } from "./ConfigOpt";
import * as _utils from "./utils";
import _styles from "./SecConfig.module.css";

export function SecConfig({
  as: _Component = _Builtin.Section,
  sec = true,
  confMap,
  slotId = "conf",
  exampleOption = true,
  exampleOptSecHead = true,
  exampleOptHeadTitleSrc = "ConfigName",
  exampleOptSideFade = true,
  exampleOptCellMap,
  exampleOptExampleCell = true,
  exampleOptCellNameSrc = "Choice",
  exampleOptCellActv = "false",
  exampleOptCellDis = "false",
  exampleOptCellClick = {},
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "config-sec")}
      grid={{
        type: "section",
      }}
      tag="section"
      id={slotId}
    >
      {confMap ?? (
        <>
          <ConfigOpt
            sec={exampleOption}
            secHeadTitleSrc={exampleOptHeadTitleSrc}
            conCellMap={exampleOptCellMap}
            conExampleCell={exampleOptExampleCell}
            secHead={exampleOptSecHead}
            conSideFade={exampleOptSideFade}
            exampleNameSrc={exampleOptCellNameSrc}
            exampleCellActv={exampleOptCellActv}
            exampleCellDis={exampleOptCellDis}
            exampleCellClick={exampleOptCellClick}
          />
          <ConfigOpt sec={exampleOption} secHeadTitleSrc="Color" />
        </>
      )}
    </_Component>
  ) : null;
}
