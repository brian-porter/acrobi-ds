"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { EmptyCollection } from "./EmptyCollection";
import * as _utils from "./utils";
import _styles from "./GridSecOffer.module.css";

export function GridSecOffer({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  secHeadTitleIcn = false,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "offer",
  secHeadTitleSrc = "Product Deals",
  conGrid5 = true,
  conGrid3 = false,
  conCellMap,
  conSlotId = "prod-off-grid",
  conCellExample = true,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleNameSrc = "ProductName here with a wrap to a 2nd line and truncation at the second lines here with a line clamp",
  exampleHookSrc = "$0.00 Off",
  exampleByVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  exampleTypeSrc = "in store",
  exampleLimitSrc = "limit 2",
  exampleActClick = {},
  exampleCellClick = {},
  secHeadAct1TxtSrc = "See All",
  secHeadAct1Click = {},
  emptyEmpty = false,
  emptySecBtn = false,
  emptyTirBtn = false,
  emptyBtmDoc = true,
  emptyIcnSrc = "prod",
  emptyHeadlineSrc = "No Offers Found",
  emptySubtxtSrc = "Sorry, there are no offers yet. If you know of an offer we'd appreciate you letting us know about it.",
  emptySecBtnTxtSrc = "Secondary CTA",
  emptyTirBtnTxtSrc = "Label",
  emptyPrimeBtnTxtSrc = "Share An Offer",
  emptyPrimeBtnStyl = "pf",
  emptySecBtnClick = {},
  emptyTirBtnClick = {},
  emptyPrimeBtnClick = {},
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "sec-prodoff-grid")}
      id={_utils.cx(
        _styles,
        "w-node-_9e98fc70-ccf4-cdf2-2ca2-a024501e7b43-501e7b43"
      )}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        titleIcn={secHeadTitleIcn}
        titleSrc={secHeadTitleSrc}
        titleIcnSrc={secHeadTitleIcnSrc}
        secHead={secHead}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1Click={secHeadAct1Click}
        act1={secHeadAct1}
      />
      {conGrid5 ? (
        <_Builtin.Grid
          className={_utils.cx(_styles, "prodoff-grid5")}
          tag="div"
          id={conSlotId}
        >
          {conCellMap}
        </_Builtin.Grid>
      ) : null}
      {conGrid3 ? (
        <_Builtin.Grid
          className={_utils.cx(_styles, "prodoff-grid3")}
          tag="div"
          id={conSlotId}
        >
          {conCellMap}
        </_Builtin.Grid>
      ) : null}
      <EmptyCollection
        empty={emptyEmpty}
        icnSrc={emptyIcnSrc}
        headlineSrc={emptyHeadlineSrc}
        subtxtSrc={emptySubtxtSrc}
        primeBtnTxtSrc={emptyPrimeBtnTxtSrc}
        secBtn={emptySecBtn}
        tirBtn={emptyTirBtn}
        btmDoc={emptyBtmDoc}
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
