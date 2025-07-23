"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { OfferHero } from "./OfferHero";
import { Spacer } from "./Spacer";
import { ItmSecCta } from "./ItmSecCta";
import { SecPlaceChoice } from "./SecPlaceChoice";
import { SecClip } from "./SecClip";
import { GridSecPlacePrice } from "./GridSecPlacePrice";
import { GridSecOffer } from "./GridSecOffer";
import { SecOffer } from "./SecOffer";
import { GridSecProduct } from "./GridSecProduct";
import * as _utils from "./utils";
import _styles from "./PItemMarket.module.css";

export function PItemMarket({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664e68130573df244d21d9b9_billboard-default.avif",
  heroImgAlt = "__wf_reserved_inherit",
  heroImgClick = {},
  heroPrimeClick = {},
  heroAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  heroAvtrAlt = "__wf_reserved_inherit",
  heroTitleSrc = "OfferTitle copy with single line truncation",
  heroSubtxt1Src = "OfferbyName|sponsored",
  heroSuprActClick = {},
  askClick = {},
  searchChange,
  searchClick = {},
  fltrAllClick = {},
  fltrAllActive = "true",
  fltrRetailClick = {},
  fltrRetailActive = "false",
  fltrBrand = true,
  fltrBrandClick = {},
  fltrBrandActive = "false",
  fltrAuc = true,
  fltrAucClick = {},
  fltrAucActive = "false",
  fltrClass = true,
  fltrClassClick = {},
  fltrClassActive = "false",
  offerMap,
  appliedMap,
  appliedExample = true,
  appliedItmClick = {},
  placeHeadAct1Click = {},
  placeCellMap,
  exampleCellPlace = true,
  placeCellActv = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="div">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-50-50", "cc-top")}
          id={_utils.cx(
            _styles,
            "w-node-_65b72e77-05b7-1a4d-77b2-d0190d8b55c5-8d980c85"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "cell-2")}
            id={_utils.cx(
              _styles,
              "w-node-_65b72e77-05b7-1a4d-77b2-d0190d8b55c6-8d980c85"
            )}
          >
            <OfferHero
              vizImgSrc={heroImgSrc}
              vizImgAlt={heroImgAlt}
              vizClick={heroImgClick}
            />
            <Spacer szDep="16" size="16" />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_65b72e77-05b7-1a4d-77b2-d0190d8b55c7-8d980c85"
            )}
          >
            <ItmSecCta
              btnClick={askClick}
              eyebrowSrc="find a deal"
              header="Market"
              desc="Apply to let stores know you're interested in this product and get personalized deals."
              btnTxtSrc="Ask"
              btnIcnSrc="Chat"
            />
            <SecPlaceChoice
              exampleCellActv={placeCellActv}
              secHeadAct1Click={placeHeadAct1Click}
              conCellMap={placeCellMap}
              conExampleCell={exampleCellPlace}
              secHeadAct1={true}
              exampleVizClr="p500"
              secHeadTitleSrc="Locations"
            />
            <SecClip
              secHeadTitleSrc="Clipped Offers"
              secHeadTitleIcn={true}
              exampleEmpty={false}
              conCellExample={true}
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-bed3107b-81ab-b673-487b-5876a2493974-8d980c85"
            )}
          >
            <GridSecPlacePrice
              secHead={true}
              conGrid3={true}
              conGrid5={false}
            />
            <GridSecOffer secHead={true} conGrid5={false} conGrid3={true} />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-e824275d-63db-e6f5-5d59-040357a14239-8d980c85"
            )}
          >
            <SecOffer secHeadTitleSrc="More {BrandName} Offers" sec={true} />
            <GridSecProduct conGrid5={false} conGrid3={true} />
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
