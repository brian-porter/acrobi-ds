"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { InputWBtns } from "./InputWBtns";
import { BtnBarSs } from "./BtnBarSs";
import { SecBrand } from "./SecBrand";
import { SecFeatured } from "./SecFeatured";
import { SecCategory } from "./SecCategory";
import { GridSecLoyalty } from "./GridSecLoyalty";
import { SecOffer } from "./SecOffer";
import * as _utils from "./utils";
import _styles from "./PBrand1.module.css";

export function PBrand1({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  heroImgAlt = "__wf_reserved_inherit",
  heroHlineSrc = "Brands You Love",
  heroSubtxt = true,
  heroSubtxtSrc = "Build ties to your favorite brands",
  heroQrClick = {},
  heroMoreClick = {},
  scanQrBtnClick = {},
  searchClick = {},
  favClick = {},
  addClick = {},
  highRate = true,
  hrMap,
  exampleHrCell = true,
  bodySecMap,
  categories = true,
  featured = true,
  brandOff = true,
  prodOff = true,
  hrCellVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/66957adac2563976c13c0bcd_Brand.svg",
  hrCellVizAlt = "__wf_reserved_inherit",
  hrCellCapt = true,
  hrCellNameSrc = "BrandName",
  hrCellCellClick = {},
  hrCellBtn = true,
  hrCellBtnTxtSrc = "Connect",
  hrCellBtnIcnSrc = "addcircle",
  hrCellBtnStyl = "pl",
  hrCellBtnDis = "false",
  hrCellBtnClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="main">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-70-30")}
          id={_utils.cx(
            _styles,
            "w-node-_210d91a2-7572-4a3b-9c76-8396fca1d8f1-dab2e7a0"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-hero")}
            id={_utils.cx(
              _styles,
              "w-node-_210d91a2-7572-4a3b-9c76-8396fca1d8f2-dab2e7a0"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "hero_sec")}
              tag="section"
              grid={{
                type: "section",
              }}
            >
              <Hero
                hlineHlineSubtxtSrc={heroSubtxtSrc}
                hlineHlineSrc={heroHlineSrc}
                icnBarIcnBarL1Click={heroQrClick}
                icnBarIcnBarR1Click={heroMoreClick}
                imgSrc={heroImgSrc}
                imgAlt={heroImgAlt}
                hlineHlineSubtxt={heroSubtxt}
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
              "w-node-_210d91a2-7572-4a3b-9c76-8396fca1d8fd-dab2e7a0"
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
                btn1Click={favClick}
                btn2Click={addClick}
                btn1TxtSrc="Most Favorited"
                btn1IcnSrc="favs"
                btn1Id="fav"
                btn2TxtSrc="Add Brand"
                btn2IcnSrc="brand"
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
              <SecBrand
                sec={highRate}
                conCellMap={hrMap}
                conExampleCell={exampleHrCell}
                exampleVizSrc={hrCellVizSrc}
                exampleVizAlt={hrCellVizAlt}
                exampleCellClick={hrCellCellClick}
                exampleBtn={hrCellBtn}
                exampleBtnTxtSrc={hrCellBtnTxtSrc}
                exampleBtnIcnSrc={hrCellBtnIcnSrc}
                exampleBtnStyl={hrCellBtnStyl}
                exampleBtnClick={hrCellBtnClick}
                exampleCapt={hrCellCapt}
                exampleTitleSrc={hrCellNameSrc}
                exampleBtnDis={hrCellBtnDis}
                secHeadTitleSrc="Top Brands"
                stats={false}
                secHeadAct1TxtSrc="All"
                secHeadTitleIcn={false}
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-grid")}
            id={_utils.cx(
              _styles,
              "w-node-_210d91a2-7572-4a3b-9c76-8396fca1d913-dab2e7a0"
            )}
          >
            {bodySecMap ?? (
              <>
                <SecFeatured sec={featured} />
                <SecCategory sec={categories} />
                <GridSecLoyalty sec={brandOff} secHead={false} />
                <SecOffer sec={prodOff} />
              </>
            )}
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
