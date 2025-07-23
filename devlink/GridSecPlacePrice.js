"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Search } from "./Search";
import { SecHead } from "./SecHead";
import { EmptyCollection } from "./EmptyCollection";
import * as _utils from "./utils";
import _styles from "./GridSecPlacePrice.module.css";

export function GridSecPlacePrice({
  as: _Component = _Builtin.Section,
  search = false,
  searchSideFade = true,
  searchScanBtn = false,
  searchFltrBtn = false,
  searchFilter = true,
  searchFilterMap,
  searchFilterExample = true,
  secHeadTitleIcn = false,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "store",
  secHeadTitleSrc = "Sellers",
  secHeadAct1TxtSrc = "See All",
  secHeadAct1Click = {},
  conGrid3 = false,
  conGrid5 = true,
  conCellMap,
  secHead = false,
  conSlotId = "place-price-grid",
  conCellExample = true,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleVizSz = "xl",
  exampleCaptTitleSrc = "$00.00",
  exampleCaptSubtxtSrc = "SellerName",
  exampleCaptSub2Src = "SellerLocation",
  exampleCellSz = "auto",
  exampleCellCard = "true",
  exampleActClick = {},
  exampleCellClick = {},
  searchScanBtnClick = {},
  searchSrchFldClick = {},
  searchFltrBtnClick = {},
  emptyEmpty = false,
  emptySecBtn = false,
  emptyTirBtn = false,
  emptyBtmDoc = true,
  emptyIcnSrc = "store",
  emptyHeadlineSrc = "No Sellers Found",
  emptySubtxtSrc = "We add new sellers every day. If you know where this item is sold please let us know.",
  emptySecBtnTxtSrc = "Secondary CTA",
  emptyTirBtnTxtSrc = "Label",
  emptyPrimeBtnTxtSrc = "Share A Seller",
  emptyPrimeBtnStyl = "pf",
  emptySecBtnClick = {},
  emptyTirBtnClick = {},
  emptyPrimeBtnClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "sec-placeprice")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <Search
        searchFldClick={searchSrchFldClick}
        search={search}
        filter={searchFilter}
        fltrCellMap={searchFilterMap}
        fltrExampleFilterChips={searchFilterExample}
        scanBtn={searchScanBtn}
        fltrBtn={searchFltrBtn}
        scanBtnClick={searchScanBtnClick}
        fltrBtnClick={searchFltrBtnClick}
        fltrSideFade={searchSideFade}
      />
      <SecHead
        act1TxtSrc={secHeadAct1TxtSrc}
        titleIcn={secHeadTitleIcn}
        titleSrc={secHeadTitleSrc}
        act1Click={secHeadAct1Click}
        act1={secHeadAct1}
        secHead={secHead}
        titleIcnSrc={secHeadTitleIcnSrc}
      />
      {conGrid3 ? (
        <_Builtin.Grid
          className={_utils.cx(_styles, "brand-grid3")}
          tag="div"
          id={conSlotId}
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
  );
}
