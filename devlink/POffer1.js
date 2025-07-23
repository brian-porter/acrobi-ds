"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { InputWBtns } from "./InputWBtns";
import { BtnBarSs } from "./BtnBarSs";
import { SecOffer } from "./SecOffer";
import { SecCategory } from "./SecCategory";
import { SecFeatured } from "./SecFeatured";
import { GridSecOffer } from "./GridSecOffer";
import { SecBrand } from "./SecBrand";
import * as _utils from "./utils";
import _styles from "./POffer1.module.css";

export function POffer1({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  heroImgAlt = "__wf_reserved_inherit",
  heroHlineSrc = "Find The Best Deal",
  heroSubtxt = true,
  heroSubtxtSrc = "Clip coupons and special offers from your favorite brands",
  heroQrClick = {},
  heroMoreClick = {},
  scanQrBtnClick = {},
  searchClick = {},
  favClick = {},
  addClick = {},
  highRate = true,
  hrMap,
  exampleHighRateCell = true,
  bodySecMap,
  categories = true,
  featured = true,
  prodOff = true,
  brands = true,
  hrCellHeadTitleIcn = false,
  hrCellHeadAct1 = false,
  hrCellHeadTitleIcnSrc = "offer",
  hrCellHeadTitleSrc = "Highly Rated Deals",
  hrCellHeadAct1TxtSrc = "See All",
  hrCellHeadAct1Click = {},
  hrCellVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif",
  hrCellVizAlt = "__wf_reserved_inherit",
  hrCellNameSrc = "ProductName here with a wrap to a 2nd line and truncation at the second lines here with a line clamp",
  hrCellHookSrc = "$0.00 Off",
  hrCellByVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  hrCellTypeSrc = "in store",
  hrCellLimitSrc = "limit 2",
  hrCellActClick = {},
  hrCellCellClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="main">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-70-30")}
          id={_utils.cx(
            _styles,
            "w-node-_6e0a9ff7-f770-141c-9ad2-38b2fcfb905e-37d42743"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-hero")}
            id={_utils.cx(
              _styles,
              "w-node-_6e0a9ff7-f770-141c-9ad2-38b2fcfb905f-37d42743"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "bqg-qs-obj-hero")}
              tag="section"
              grid={{
                type: "section",
              }}
            >
              <Hero
                hlineHlineSubtxt={heroSubtxt}
                hlineHlineSubtxtSrc={heroSubtxtSrc}
                hlineHlineSrc={heroHlineSrc}
                icnBarIcnBarL1Click={heroQrClick}
                icnBarIcnBarR1Click={heroMoreClick}
                imgSrc={heroImgSrc}
                imgAlt={heroImgAlt}
                btn={false}
                btnBtnTxtSrc="Find Brands"
                btnBtnIcnSrc="Brand"
                icnBarIcnBarR1Src="Moreh"
                icnBar={true}
                hlineHlineLoc="btm"
                fadeBtm={false}
                avtrAvtrHline={true}
                heroAsp="21-9"
                btnBtnTxt={true}
                avtrAvtrHlineSrc="FName LI"
                btnBtnClick={{}}
                icnBarIcnBarL1Src="scan_qr"
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-act")}
            id={_utils.cx(
              _styles,
              "w-node-_6e0a9ff7-f770-141c-9ad2-38b2fcfb9069-37d42743"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "act-sec")}
              tag="section"
              grid={{
                type: "section",
              }}
            >
              <InputWBtns
                lLBtnClick={scanQrBtnClick}
                fldFldClick={searchClick}
                fldFldTBtn={false}
                tTBtn={false}
              />
              <BtnBarSs
                btn2Click={addClick}
                btn1Click={favClick}
                btn1TxtSrc="Most Favorited"
                btn1IcnSrc="favs"
                btn1Id="fav"
                btn2TxtSrc="Add Offer"
                btn2IcnSrc="offer"
                btn2Id="add"
                btn3TxtSrc="Message"
                btn3IcnSrc="chat"
                btn3Id="chat"
                btn4IcnSrc="alarm"
                btn4TxtSrc="Set Alert"
                btn4Id="alerts"
                btn8TxtSrc="Settings"
                btn8IcnSrc="setting"
                btn8Id="settings"
                btn5={false}
                btn3Click={{}}
                btn4Click={{}}
                btn2={true}
                btn3Dis="true"
                btn4Dis="true"
              />
              <SecOffer
                sec={highRate}
                conCellMap={hrMap}
                conExampleCell={exampleHighRateCell}
                exampleVizSrc={hrCellVizSrc}
                exampleVizAlt={hrCellVizAlt}
                exampleNameSrc={hrCellNameSrc}
                exampleHookSrc={hrCellHookSrc}
                exampleByVizSrc={hrCellByVizSrc}
                exampleTypeSrc={hrCellTypeSrc}
                exampleLimitSrc={hrCellLimitSrc}
                exampleActClick={hrCellActClick}
                exampleCellClick={hrCellCellClick}
                secHeadTitleSrc={hrCellHeadTitleSrc}
                secHeadTitleIcnSrc={hrCellHeadTitleIcnSrc}
                secHeadTitleIcn={hrCellHeadTitleIcn}
                secHeadAct1={hrCellHeadAct1}
                secHeadAct1TxtSrc={hrCellHeadAct1TxtSrc}
                secHeadAct1Click={hrCellHeadAct1Click}
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-grid")}
            id={_utils.cx(
              _styles,
              "w-node-_6e0a9ff7-f770-141c-9ad2-38b2fcfb907e-37d42743"
            )}
          >
            <SecCategory sec={categories} />
            <SecFeatured
              sec={featured}
              brand={false}
              secHeadTitleSrc="Featured Deals"
              offer={true}
            />
            <GridSecOffer sec={prodOff} />
            <SecBrand sec={brands} secHeadTitleSrc="Popular Brands" />
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
