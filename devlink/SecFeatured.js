"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import * as _utils from "./utils";
import _styles from "./SecFeatured.module.css";

export function SecFeatured({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  secHeadTitleIcn = false,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "offer",
  secHeadTitleSrc = "Featured Brands",
  brand = true,
  offer = false,
  conCellMap,
  conSlotId = "BrandFeature",
  conSlotIdOff = "OfferFeature",
  conExampleBrandCell = true,
  conExampleOfferCell = true,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleByVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/66957adac2563976c13c0bcd_Brand.svg",
  exampleByVizAlt = "__wf_reserved_inherit",
  exampleNameSrc = "BrandName",
  exampleHookSrc = "5% Cash Back",
  exampleHook2 = true,
  exampleHook2Src = "Seconday Hook",
  exampleTypeSrc = "in store",
  exampleLimitSrc = "limit 2",
  exampleAct = true,
  exampleActClick = {},
  exampleCellClick = {},
  secHeadAct1TxtSrc = "More",
  secHeadAct1Click = {},
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "", "sec-feature-grid")}
      tag="section"
      grid={{
        type: "section",
      }}
      id="Featured"
    >
      <SecHead
        titleIcn={secHeadTitleIcn}
        titleSrc={secHeadTitleSrc}
        titleIcnSrc={secHeadTitleIcnSrc}
        secHead={secHead}
        act1Click={secHeadAct1Click}
        act1={secHeadAct1}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1IcnSrc="Moreh"
      />
      {brand ? (
        <_Builtin.Grid
          className={_utils.cx(_styles, "featured-brand-grid")}
          tag="div"
          id={conSlotId}
        >
          {conCellMap}
        </_Builtin.Grid>
      ) : null}
      {offer ? (
        <_Builtin.Grid
          className={_utils.cx(_styles, "featured-offer-grid")}
          tag="div"
          id={conSlotIdOff}
        >
          {conCellMap}
        </_Builtin.Grid>
      ) : null}
    </_Component>
  ) : null;
}
