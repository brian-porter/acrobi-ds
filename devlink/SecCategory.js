"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { BarSs } from "./BarSs";
import * as _utils from "./utils";
import _styles from "./SecCategory.module.css";

export function SecCategory({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = false,
  secHeadTitleIcn = false,
  conSideFade = true,
  conCellMap,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleVizAsp = "21-9",
  exampleNameSrc = "CategoryName",
  exampleCellClick = {},
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "default",
  secHeadTitleSrc = "Section Header",
  secHeadTitleSz = "r2",
  secHeadTitleClr = "in",
  secHeadAct1TxtSrc = "Cancel",
  secHeadAct1Click = {},
  conCellExample = true,
  conEmpty = false,
  exampleVizSz,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "sec-categories-ss")}
      tag="section"
      grid={{
        type: "section",
      }}
      id="Categories"
    >
      <SecHead
        secHead={secHead}
        titleIcn={secHeadTitleIcn}
        titleIcnSrc={secHeadTitleIcnSrc}
        titleSrc={secHeadTitleSrc}
        act1={secHeadAct1}
        act1Click={secHeadAct1Click}
        act1TxtSrc={secHeadAct1TxtSrc}
        titleSz={secHeadTitleSz}
        titleClr={secHeadTitleClr}
      />
      <BarSs
        barMap={conCellMap}
        sideFade={conSideFade}
        empty={conEmpty}
        barPad=""
        slotId="BrandCats"
        exampleCategories={true}
      />
    </_Component>
  ) : null;
}
