"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Swiper } from "./Swiper";
import { OlIconbarAction } from "./OlIconbarAction";
import { Rating } from "./Rating";
import { ButtonDub } from "./ButtonDub";
import { Label } from "./Label";
import { SecConfig } from "./SecConfig";
import { SecItmInfo } from "./SecItmInfo";
import { SecProduct } from "./SecProduct";
import { SecPeep } from "./SecPeep";
import { SecBrand } from "./SecBrand";
import { SecOffer } from "./SecOffer";
import * as _utils from "./utils";
import _styles from "./PItemSnip.module.css";

export function PItemSnip({
  as: _Component = _Builtin.Block,
  swipSlideMap,
  exampleSlide = true,
  swipSlideDetailMap,
  exampleSlideDetail = true,
  swipVizSrc1 = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif",
  swipVizAlt1 = "__wf_reserved_inherit",
  swipVizSrc2 = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif",
  swipVizAlt2 = "__wf_reserved_inherit",
  swipVizSrc3 = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif",
  swipVizAlt3 = "__wf_reserved_inherit",
  qrClick = {},
  moreClick = {},
  itmPriceSrc = "$00.00",
  addIcnSrc = "Addcirc",
  addClick = {},
  cartTag = false,
  cartQty = "1",
  listIcnSrc = "List",
  listClick = {},
  listNameSrc = "{ListName}",
  listTypeIcnSrc = "default",
  itmRateValueSrc = "0",
  itmRateQtySrc = "0",
  itmRateClick = {},
  config = true,
  configMap,
  itmName = "Item name goes here with a line wrap",
  itmManuf = "ManufacturerName",
  aboutSrc = "Body copy goes here for the about section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  specsSrc = "Body copy goes here for specs section Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  comp = true,
  compAllClick = {},
  compExample = true,
  compMap,
  sellers = true,
  sellerAllClick = {},
  sellerMap,
  sellerExample = true,
  sellerStat1 = "X ties",
  sellerStat2 = "X online only",
  sellerStat3 = "XX resellers",
  owners = true,
  ownAllClick = {},
  ownMap,
  ownersExample = true,
  ownVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  ownNameSrc = "FName",
  ownStat1 = "X connections",
  ownStat2 = "XX community",
  offers = true,
  offAllClick = {},
  offVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  offMap,
  offerExample = true,
  offVizAlt = "__wf_reserved_inherit",
  offNameSrc = "ProductName here with a wrap to a 2nd line and truncation at the second lines here with a line clamp",
  offHookSrc = "$0.00 Off",
  offByVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  offTypeSrc = "in store",
  offLimitSrc = "limit 2",
  offActClick = {},
  offCellClick = {},
  offStat1 = "XX offers",
  offStat2 = "X retailers",
  offStat3 = "X makers",
  offStat4 = "X stackable",
  addTxtSrc = "Add",
  itmAcrdItmMap,
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="div">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-50-50")}
          id={_utils.cx(
            _styles,
            "w-node-_888f51cb-45d1-8abc-4404-986b929775c7-17986e08"
          )}
        >
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-bb65d3a6-2bb1-bb22-e65a-cd3e02c28d63-17986e08"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "hero-item")}
              grid={{
                type: "section",
              }}
              tag="section"
            >
              <Swiper
                slideMap={swipSlideMap}
                exampleSlide={exampleSlide}
                slideDetailMap={swipSlideDetailMap}
                exampleSlideDetail={exampleSlideDetail}
                swipVizSrc={swipVizSrc1}
                swipVizAlt={swipVizAlt1}
              />
              <OlIconbarAction
                l1IcnL1Click={qrClick}
                r1IcnR1Click={moreClick}
                r1IcnR1Src="Moreh"
                l1IcnL1Src="Qr"
                icnBar={true}
                l1IcnL1Clr="n700"
                r1IcnR1Clr="n700"
                l1IcnL1DrpShdw=""
                r1IcnR1DrpShdw=""
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_14801121-974a-4af8-23f4-1b36c4fa1f44-17986e08"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "item_details")}
              grid={{
                type: "section",
              }}
              tag="section"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "item_cta")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "item_cta-col1")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "item_cta-stack")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "item_cta-eyebrow")}
                      tag="div"
                    >
                      {"starting at"}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "item_cta-price")}
                      tag="div"
                    >
                      {itmPriceSrc}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "item_rating")}
                    tag="div"
                    {...itmRateClick}
                  >
                    <Rating
                      valueSrc={itmRateValueSrc}
                      qtySrc={itmRateQtySrc}
                      qty={true}
                      r1Full={true}
                      r2Full={true}
                      r3Full={true}
                      r4Half={true}
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "item_cta-col2")}
                  tag="div"
                >
                  <ButtonDub
                    btn1Click={addClick}
                    btn2Click={listClick}
                    btn1Tag={cartTag}
                    btn1TagQty={cartQty}
                    btn1IcnSrc={addIcnSrc}
                    btn2IcnSrc={listIcnSrc}
                    btn1LblSrc={addTxtSrc}
                  />
                  <Label
                    txtSrc={listNameSrc}
                    icnSrc={listTypeIcnSrc}
                    icn={true}
                    lblSz="r4"
                    lblClr="n500"
                    icnLoc="r"
                    lblGap="4"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
              <SecConfig confMap={configMap} sec={config} />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-ac694015-a202-256c-85e3-b5619293af53-17986e08"
            )}
          >
            <SecItmInfo
              itmNameSrc={itmName}
              itmManufSrc={itmManuf}
              aboutSrc={aboutSrc}
              specsSrc={specsSrc}
              acrdItmMap={itmAcrdItmMap}
            />
            <SecProduct
              conExampleCell={compExample}
              sec={comp}
              secHeadAct1Click={compAllClick}
              conCellMap={compMap}
              secHeadTitleSrc="Complemetary"
              secHeadAct1={true}
              secHeadTitleIcn={true}
              secHeadTitleIcnSrc="sync_issue"
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_37f0fe67-8625-e7d1-e5b8-57b935737fc3-17986e08"
            )}
          >
            <SecPeep
              exampleTitleSrc={ownNameSrc}
              sec={owners}
              secHeadAct1Click={ownAllClick}
              conCellMap={ownMap}
              conExampleCell={ownersExample}
              stat1Src={ownStat1}
              stat2Src={ownStat2}
              exampleVizSrc={ownVizSrc}
              exampleBtn={false}
              exampleCaptSubtxt={false}
              secHeadAct1TxtSrc="See All"
              secHeadTitleSrc="Owners & Listers"
            />
            <SecBrand
              stat1Src={sellerStat1}
              stat2Src={sellerStat2}
              stat3Src={sellerStat3}
              secHeadAct1Click={sellerAllClick}
              conCellMap={sellerMap}
              sec={sellers}
              conExampleCell={sellerExample}
              secHeadTitleSrc="Sold At"
              secHeadAct1={true}
              secHeadTitleIcnSrc="store"
              secHeadAct1TxtSrc="See All"
              secHeadTitleIcn={true}
              exampleBtn={false}
              stat3={true}
              stats={true}
            />
            <SecOffer
              stat1Src={offStat1}
              stat2Src={offStat2}
              stat3Src={offStat3}
              secHeadAct1Click={offAllClick}
              conCellMap={offMap}
              conExampleCell={offerExample}
              exampleVizSrc={offVizSrc}
              stat4Src={offStat4}
              sec={offers}
              exampleVizAlt={offVizAlt}
              exampleNameSrc={offNameSrc}
              exampleHookSrc={offHookSrc}
              exampleByVizSrc={offByVizSrc}
              exampleTypeSrc={offTypeSrc}
              exampleLimitSrc={offLimitSrc}
              exampleActClick={offActClick}
              exampleCellClick={offCellClick}
              secHeadTitleSrc="Offers Available"
              secHeadTitleIcn={true}
              stats={true}
              stat3={true}
              secHeadAct1={true}
            />
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
