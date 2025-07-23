"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { InputWBtns } from "./InputWBtns";
import { BtnBarSs } from "./BtnBarSs";
import { SecBrand } from "./SecBrand";
import { SecCategory } from "./SecCategory";
import { SecFeatured } from "./SecFeatured";
import { GridSecLoyalty } from "./GridSecLoyalty";
import { SecOffer } from "./SecOffer";
import * as _utils from "./utils";
import _styles from "./PBrand2.module.css";

export function PBrand2({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  heroImgAlt = "__wf_reserved_inherit",
  heroHlineSrc = "{BrandCategory}",
  heroSubtxt = false,
  heroSubtxtSrc = "Subhead description below",
  heroQrClick = {},
  heroMoreClick = {},
  scanQrBtnClick = {},
  searchClick = {},
  favClick = {},
  addClick = {},
  highRate = true,
  bodySecMap,
  categories = true,
  featured = true,
  brandOff = true,
  prodOff = true,
  hrMap,
  exampleHrCell = true,
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
            "w-node-fbc4265e-7ca8-755b-80f5-0485d2fe7b8b-7ddde35b"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-hero")}
            id={_utils.cx(
              _styles,
              "w-node-fbc4265e-7ca8-755b-80f5-0485d2fe7b8c-7ddde35b"
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
                hlineHlineSrc={heroHlineSrc}
                imgSrc={heroImgSrc}
                hlineHlineSubtxtSrc={heroSubtxtSrc}
                hlineHlineSubtxt={heroSubtxt}
                icnBarIcnBarL1Click={heroQrClick}
                icnBarIcnBarR1Click={heroMoreClick}
                imgAlt={heroImgAlt}
                btn={false}
                btnBtnIcnSrc="Photo"
                btnBtnTxtSrc="Add"
                btnBtnTxt={true}
                icnBar={true}
                icnBarIcnBarR1Src="Moreh"
                heroAsp="21-9"
                fadeBtm={false}
                hlineHlineLoc="btm"
                btnBtnClick={{}}
                icnBarIcnBarL1Src="Qr"
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-act")}
            id={_utils.cx(
              _styles,
              "w-node-fbc4265e-7ca8-755b-80f5-0485d2fe7b8d-7ddde35b"
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
                btn2TxtSrc="Add Brand"
                btn3TxtSrc="Mesage"
                btn4TxtSrc="Alerts"
                btn3IcnSrc="chat"
                btn3Id="chat"
                btn2IcnSrc="brand"
                btn2Id="add"
                btn1Id="fav"
                btn4Id="alert"
                btn4IcnSrc="alarm"
                btn1IcnSrc="favs"
                btn8TxtSrc="Settings"
                btn8IcnSrc="setting"
                btn8Id="settings"
                btn5={false}
                btn3Click={{}}
                btn4Click={{}}
                btn8Click={{}}
                btn3={false}
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
                exampleBtnDis={hrCellBtnDis}
                exampleTitleSrc={hrCellNameSrc}
                exampleCapt={hrCellCapt}
                secHeadTitleSrc="Highly Rated"
                stats={false}
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-grid")}
            id={_utils.cx(
              _styles,
              "w-node-fbc4265e-7ca8-755b-80f5-0485d2fe7b8e-7ddde35b"
            )}
          >
            {bodySecMap ?? (
              <>
                <SecCategory
                  sec={categories}
                  conCellMap=""
                  conCellExample={true}
                  exampleVizSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                  exampleVizAlt="__wf_reserved_inherit"
                  exampleNameSrc="CategoryName"
                  exampleCellClick={{}}
                />
                <SecFeatured
                  sec={featured}
                  conExampleOfferCell={true}
                  exampleVizSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                  exampleVizAlt="__wf_reserved_inherit"
                  exampleAct={true}
                  exampleByVizSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/66957adac2563976c13c0bcd_Brand.svg"
                  exampleByVizAlt="__wf_reserved_inherit"
                  exampleNameSrc="BrandName"
                  exampleHookSrc="@handle"
                  exampleActClick={{}}
                  exampleCellClick={{}}
                  conCellMap=""
                />
                <GridSecLoyalty
                  sec={brandOff}
                  conExampleCell={true}
                  exampleVizSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/66957adac2563976c13c0bcd_Brand.svg"
                  exampleVizAlt="__wf_reserved_inherit"
                  exampleNameSrc="BrandName"
                  exampleHookSrc="Offer1Title"
                  exampleHook2Src="Offer2Title"
                  exampleCellClick={{}}
                  conCellMap=""
                />
                <SecOffer sec={prodOff} />
              </>
            )}
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
