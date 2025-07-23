"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { EmptyCollection } from "./EmptyCollection";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./GridSecBrand.module.css";

export function GridSecBrand({
  as: _Component = _Builtin.Section,
  sec = true,
  secHeadAct1 = false,
  secHeadTitleIcn = false,
  secHeadTitleIcnSrc = "default",
  secHeadTitleSrc = "Brands",
  conGrid3 = false,
  conGrid5 = true,
  conCellMap,
  conSlotId = "brand-off-grid",
  conExampleBrands = true,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleNameSrc = "BrandName",
  exampleHookSrc = "MainHook",
  exampleCellClick = {},
  secHead = true,
  secHeadAct1TxtSrc = "Cancel",
  secHeadAct1Click = {},
  stats = false,
  stat1Src = "stat1",
  stat2Src = "stat2",
  stat3Src = "stat3",
  stat4Src = "stat4",
  stat2 = true,
  stat3 = false,
  stat4 = false,
  emptyEmpty = false,
  emptySecBtn = false,
  emptyTirBtn = false,
  emptyBtmDoc = false,
  emptyIcnSrc = "brand",
  emptyHeadlineSrc = "No Brands Found",
  emptySubtxtSrc = "Once we've added brands and their offer to you, they will show up here for you to benefit from.",
  emptySecBtnTxtSrc = "Secondary CTA",
  emptyTirBtnTxtSrc = "Label",
  emptyPrimeBtnTxtSrc = "Primary CTA",
  emptyPrimeBtnStyl = "pf",
  emptySecBtnClick = {},
  emptyTirBtnClick = {},
  emptyPrimeBtnClick = {},
  slotId3 = "brand-off-grid",
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "brand-grid-sec")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        titleSrc={secHeadTitleSrc}
        titleIcn={secHeadTitleIcn}
        act1={secHeadAct1}
        secHead={secHead}
        titleIcnSrc={secHeadTitleIcnSrc}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1Click={secHeadAct1Click}
      />
      {conGrid3 ? (
        <_Builtin.Grid
          className={_utils.cx(_styles, "brand-grid3")}
          tag="div"
          id={slotId3}
        >
          {conCellMap}
        </_Builtin.Grid>
      ) : null}
      {conGrid5 ? (
        <_Builtin.Grid
          className={_utils.cx(_styles, "brand-grid5")}
          tag="div"
          id={conSlotId}
        >
          {conCellMap}
        </_Builtin.Grid>
      ) : null}
      <EmptyCollection
        empty={emptyEmpty}
        secBtn={emptySecBtn}
        tirBtn={emptyTirBtn}
        icnSrc={emptyIcnSrc}
        headlineSrc={emptyHeadlineSrc}
        subtxtSrc={emptySubtxtSrc}
        btmDoc={emptyBtmDoc}
        secBtnTxtSrc={emptySecBtnTxtSrc}
        secBtnClick={emptySecBtnClick}
        tirBtnTxtSrc={emptyTirBtnTxtSrc}
        tirBtnClick={emptyTirBtnClick}
        primeBtnTxtSrc={emptyPrimeBtnTxtSrc}
        primeBtnStyl={emptyPrimeBtnStyl}
        primeBtnClick={emptyPrimeBtnClick}
      />
      <StatsBar
        stats={stats}
        stat4={stat4}
        stat3={stat3}
        stat1Src={stat1Src}
        stat2Src={stat2Src}
        stat3Src={stat3Src}
        stat4Src={stat4Src}
        stat2={stat2}
      />
    </_Component>
  ) : null;
}
