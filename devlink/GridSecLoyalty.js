"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { EmptyCollection } from "./EmptyCollection";
import * as _utils from "./utils";
import _styles from "./GridSecLoyalty.module.css";

export function GridSecLoyalty({
  as: _Component = _Builtin.Section,
  sec = true,
  secHeadTitleIcn = false,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "default",
  secHeadTitleSrc = "Section Header",
  secHeadAct1TxtSrc = "See All",
  secHeadAct1Click = {},
  conCellMap,
  conSlotId = "Loyalty",
  conExampleCell = true,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/66957adac2563976c13c0bcd_Brand.svg",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleNameSrc = "BrandName",
  exampleHookSrc = "5% Cash Back",
  exampleHook2 = true,
  exampleHook2Src = "Secondary Hook",
  exampleCellClick = {},
  secHead = false,
  emptyEmpty = false,
  emptySecBtn = false,
  emptyTirBtn = false,
  emptyBtmDoc = true,
  emptyIcnSrc = "brand",
  emptyHeadlineSrc = "No Loyalty Programs Found",
  emptySubtxtSrc = "We add new loyalty programs daily. If you're familiar with one you'd like to see here, let us know.",
  emptySecBtnTxtSrc = "Secondary CTA",
  emptyTirBtnTxtSrc = "Label",
  emptyPrimeBtnTxtSrc = "Share One",
  emptyPrimeBtnStyl = "pf",
  emptySecBtnClick = {},
  emptyTirBtnClick = {},
  emptyPrimeBtnClick = {},
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "sec-loyalty")}
      tag="section"
      grid={{
        type: "section",
      }}
      id="Offers"
    >
      <SecHead
        titleIcn={secHeadTitleIcn}
        secHead={secHead}
        titleIcnSrc={secHeadTitleIcnSrc}
        titleSrc={secHeadTitleSrc}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1Click={secHeadAct1Click}
        act1={secHeadAct1}
      />
      <_Builtin.Grid
        className={_utils.cx(_styles, "loyalty-grid")}
        tag="div"
        id={conSlotId}
      >
        {conCellMap}
      </_Builtin.Grid>
      <EmptyCollection
        empty={emptyEmpty}
        secBtn={emptySecBtn}
        tirBtn={emptyTirBtn}
        btmDoc={emptyBtmDoc}
        icnSrc={emptyIcnSrc}
        headlineSrc={emptyHeadlineSrc}
        subtxtSrc={emptySubtxtSrc}
        primeBtnTxtSrc={emptyPrimeBtnTxtSrc}
        secBtnTxtSrc={emptySecBtnTxtSrc}
        tirBtnTxtSrc={emptyTirBtnTxtSrc}
        primeBtnStyl={emptyPrimeBtnStyl}
        secBtnClick={emptySecBtnClick}
        tirBtnClick={emptyTirBtnClick}
        primeBtnClick={emptyPrimeBtnClick}
      />
    </_Component>
  ) : null;
}
