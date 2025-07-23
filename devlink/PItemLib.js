"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ItemHead } from "./ItemHead";
import { Spacer } from "./Spacer";
import { ItmSecCta } from "./ItmSecCta";
import { InputWBtns } from "./InputWBtns";
import { AcrdSec } from "./AcrdSec";
import { BarSs } from "./BarSs";
import { List } from "./List";
import { ListItmCtrl } from "./ListItmCtrl";
import { SecHead } from "./SecHead";
import { ChipCloud } from "./ChipCloud";
import * as _utils from "./utils";
import _styles from "./PItemLib.module.css";

export function PItemLib({
  as: _Component = _Builtin.Block,
  itmHead = true,
  itmImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  itmImgAlt = "__wf_reserved_inherit",
  itmName = "ItemName description goes here andline wraps",
  libAddClick = {},
  scanBtn = false,
  scanBtnClick = {},
  searchClick = {},
  searchChange,
  fltrBtn = false,
  fltrClick = {},
  man = true,
  recipe = true,
  guide = true,
  coms = true,
  myAcrdMyClick = {},
  myAcrdMyMap,
  myExampleMyDoc = false,
  myMyDocMap,
  myMyDocImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  myMyDocImgAlt = "__wf_reserved_inherit",
  myMyDocTitleSrc = "DocName goes here with a line wrap to a second",
  myMyDocClick = {},
  myMyDocEmpty = true,
  myMyDocEmptyClick = {},
  manAcrdManClick = {},
  manAcrdManMap,
  manExampleMan = true,
  manManMap,
  manManImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  manManImgAlt = "__wf_reserved_inherit",
  manManTitleSrc = "DocName goes here with a line wrap to a second",
  manManClick = {},
  recipeAcrdRecipeClick = {},
  recipeAcrdRecipeMap,
  recipeExampleRecipe = true,
  recipeRecipeMap,
  recipeRecipeImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  recipeRecipeImgAlt = "__wf_reserved_inherit",
  recipeRecipeTitleSrc = "RecipeName goes here with line wrap to a second",
  recipeRecipeClick = {},
  recipeSlotIdRecipe = "doc",
  guideAcrdGuideClick = {},
  guideAcrdGuideMap,
  guideExampleGuide = true,
  guideGuideMap,
  guideGuideImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  guideGuideImgAlt = "__wf_reserved_inherit",
  guideGuideTitleSrc = "DocName goes here",
  guideGuideClick = {},
  guideSlotIdGuides = "doc",
  comsAcrdComsClick = {},
  comsAcrdComsMap,
  comsExampleComs = true,
  comsComsAdptIcnSrc = "Warn",
  comsComsAdptBgClr = "red-700",
  comsComsTitleSrc = "Recall Title",
  comsComsSubtxtSrc = "BrandName",
  comsComsTimeSrc = "14h",
  comsComsClick = {},
  feature = true,
  featureFeatureMap,
  featureExampleFeature = true,
  featureFeatureImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  featureFeatureImgAlt = "__wf_reserved_inherit",
  featureFeatureTitleSrc = "DocName",
  featureFeatureClick = {},
  issue = true,
  issueIssueAdd = false,
  issueIssueAddClick = {},
  issueIssueMap,
  issueExampleIssueChip = true,
  issueIssueTxtSrc = "Chip Label",
  issueIssueClick = {},
  parts = true,
  partsPartsMap,
  partsExampleParts = true,
  partsPartsImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  partsPartsImgAlt = "__wf_reserved_inherit",
  partsPartsActClick = {},
  partsPartsQty = false,
  partsPartsQtySrc = "1",
  partsPartsTitleSrc = "PartName goes here and will wrap to a second line",
  partsPartsNumSrc = "part # 0000000",
  partsPartsAmt = "$000",
  partsPartsClick = {},
  manSlotIdMan = "doc",
  mySlotIdMy = "doc",
  partsSlotIdParts = "prod-part",
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="div">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-60-40")}
          id={_utils.cx(
            _styles,
            "w-node-_44f24c45-1747-66a3-9f4d-6c3ce4724db0-d7db7d04"
          )}
        >
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_44f24c45-1747-66a3-9f4d-6c3ce4724db1-d7db7d04"
            )}
          >
            <ItemHead
              itmHead={itmHead}
              itmImgSrc={itmImgSrc}
              itmImgAlt={itmImgAlt}
              name={itmName}
            />
            <Spacer szDep="32" size="32" />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_44f24c45-1747-66a3-9f4d-6c3ce4724db9-d7db7d04"
            )}
          >
            <ItmSecCta
              btnClick={libAddClick}
              header="Library"
              eyebrowSrc="get the details"
              desc="Find documents associated with the purchase of the product, user manuals, set up instructions, repair guides, warranty, and recall information."
              btnIcnSrc="Library"
              btnTxtSrc="Add"
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_44f24c45-1747-66a3-9f4d-6c3ce4724dc2-d7db7d04"
            )}
          >
            <InputWBtns
              lLBtn={scanBtn}
              tTBtn={fltrBtn}
              lLBtnClick={scanBtnClick}
              fldFldClick={searchClick}
              fldFldOnChange={searchChange}
              tTBtnClick={fltrClick}
              tTBtnIcnSrc="act_filter"
              fldFldTBtn={false}
              tTBtnPad="n"
            />
            <Spacer size="16" />
            <_Builtin.Block
              className={_utils.cx(_styles, "list-area")}
              tag="div"
            >
              <_Builtin.Section
                className={_utils.cx(_styles, "lib-sec-my")}
                grid={{
                  type: "section",
                }}
                tag="section"
              >
                <AcrdSec
                  secClick={myAcrdMyClick}
                  secSubMap={myAcrdMyMap}
                  secName="My Doc's"
                  exampleSecSub={false}
                  secIcn="receipt"
                  acrdSec={true}
                />
                <Spacer szDep="8" size="8" />
                <BarSs
                  empty={myMyDocEmpty}
                  barMap={myMyDocMap}
                  emptyClick={myMyDocEmptyClick}
                  slotId={mySlotIdMy}
                  sideFade={true}
                  emptyIcnSrc="binders"
                  emptyHlineSrc="Keeping You Organized"
                  emptySubTxtSrc="your purchase documents and warranty details here"
                  emptyCtaTxtSrc="Add Attachment"
                />
              </_Builtin.Section>
              {man ? (
                <_Builtin.Section
                  className={_utils.cx(_styles, "lib-sec-manuals")}
                  grid={{
                    type: "section",
                  }}
                  tag="section"
                >
                  <AcrdSec
                    secClick={manAcrdManClick}
                    secSubMap={manAcrdManMap}
                    secName="Manuals"
                    exampleSecSub={false}
                    secIcn="manuals"
                    acrdSec={true}
                  />
                  <_Builtin.Grid
                    className={_utils.cx(_styles, "grid-docs")}
                    tag="div"
                    id={manSlotIdMan}
                  >
                    {manManMap}
                  </_Builtin.Grid>
                </_Builtin.Section>
              ) : null}
              {recipe ? (
                <_Builtin.Section
                  className={_utils.cx(_styles, "lib-sec-recipe")}
                  grid={{
                    type: "section",
                  }}
                  tag="section"
                >
                  <AcrdSec
                    secClick={recipeAcrdRecipeClick}
                    secSubMap={recipeAcrdRecipeMap}
                    secName="Recipes"
                    exampleSecSub={false}
                    acrdSec={true}
                    secIcn="i_recipe"
                  />
                  <_Builtin.Grid
                    className={_utils.cx(_styles, "grid-docs")}
                    tag="div"
                    id={recipeSlotIdRecipe}
                  >
                    {recipeRecipeMap}
                  </_Builtin.Grid>
                </_Builtin.Section>
              ) : null}
              {guide ? (
                <_Builtin.Section
                  className={_utils.cx(_styles, "lib-sec-guides")}
                  grid={{
                    type: "section",
                  }}
                  tag="section"
                >
                  <AcrdSec
                    secClick={guideAcrdGuideClick}
                    secSubMap={guideAcrdGuideMap}
                    secName="Repair Guides"
                    exampleSecSub={false}
                    acrdSec={true}
                    secIcn="a_tool"
                  />
                  <_Builtin.Grid
                    className={_utils.cx(_styles, "grid-docs")}
                    tag="div"
                    id={guideSlotIdGuides}
                  >
                    {guideGuideMap}
                  </_Builtin.Grid>
                </_Builtin.Section>
              ) : null}
              {coms ? (
                <_Builtin.Section
                  className={_utils.cx(_styles, "lib-sec-comms")}
                  grid={{
                    type: "section",
                  }}
                  tag="section"
                >
                  <AcrdSec
                    secClick={comsAcrdComsClick}
                    secSubMap={comsAcrdComsMap}
                    secName="Recalls & Comm."
                    exampleSecSub={false}
                    secIcn="recall"
                    acrdSec={true}
                  />
                  <List listItmMap={comsAcrdComsMap} exampleListItm={false} />
                  <ListItmCtrl
                    listItem={comsExampleComs}
                    lLAdptIcn={true}
                    lLAdptBgClr="fd500"
                    pPTitleSrc="RecallTitle"
                    lLAdptIcnSrc="Warn"
                    pPSubtxtSrc="BrandName"
                  />
                </_Builtin.Section>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "cell-8")}
            id={_utils.cx(
              _styles,
              "w-node-_44f24c45-1747-66a3-9f4d-6c3ce4724dc8-d7db7d04"
            )}
          >
            {feature ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "featured-itms")}
                tag="div"
              >
                <Spacer szDep="8" size="8" />
                <_Builtin.Section
                  className={_utils.cx(_styles, "announce_sec")}
                  tag="section"
                  grid={{
                    type: "section",
                  }}
                  data-shadow="y"
                >
                  <SecHead
                    titleSrc="Featured"
                    act1TxtSrc="Edit"
                    subtxtSrc="How others see you"
                    sz=""
                    act1Click={{}}
                    titleSz="r2"
                    act1={false}
                  />
                  <BarSs
                    empty={myMyDocEmpty}
                    barMap={myMyDocMap}
                    slotId={mySlotIdMy}
                    emptyClick={featureFeatureClick}
                    sideFade={true}
                  />
                  <Spacer szDep="8" size="8" />
                </_Builtin.Section>
                <Spacer szDep="16" size="16" />
              </_Builtin.Block>
            ) : null}
            {issue ? (
              <_Builtin.Section
                className={_utils.cx(_styles, "lib-sec-issues")}
                grid={{
                  type: "section",
                }}
                tag="section"
              >
                <SecHead
                  act1={issueIssueAdd}
                  act1Click={issueIssueAddClick}
                  titleSrc="Common Issues"
                  titleIcn={true}
                  titleIcnClr="p500"
                  titleIcnSrc="issues"
                  act1TxtSrc="Add"
                  act1IcnSrc=""
                  act1Txt={false}
                  act1Icn={true}
                />
                <ChipCloud
                  chipMap={issueIssueMap}
                  exampleChip={issueExampleIssueChip}
                  chipTxtSrc={issueIssueTxtSrc}
                  chipClick={issueIssueClick}
                />
              </_Builtin.Section>
            ) : null}
            {parts ? (
              <_Builtin.Section
                className={_utils.cx(_styles, "lib-sec-parts")}
                grid={{
                  type: "section",
                }}
                tag="section"
              >
                <SecHead
                  act1={false}
                  titleSrc="Popular Parts"
                  titleIcn={true}
                  titleIcnClr="p500"
                  titleIcnSrc="parts"
                />
                <_Builtin.Grid
                  className={_utils.cx(_styles, "grid-lib-parts")}
                  tag="div"
                  id={partsSlotIdParts}
                >
                  {partsPartsMap}
                </_Builtin.Grid>
              </_Builtin.Section>
            ) : null}
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
