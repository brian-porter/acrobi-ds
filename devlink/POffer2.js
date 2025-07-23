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
import _styles from "./POffer2.module.css";

export function POffer2({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  heroImgAlt = "__wf_reserved_inherit",
  heroHlineSrc = "{OfferCategory}",
  heroSubtxt = false,
  heroSubtxtSrc = "Subhead description below",
  heroQrClick = {},
  heroMoreClick = {},
  scanQrBtnClick = {},
  searchClick = {},
  favClick = {},
  addClick = {},
  highRate = true,
  hrMap,
  exampleHighRateCell = true,
  hrCellOffVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif",
  hrCellOffVizAlt = "__wf_reserved_inherit",
  hrCellOffNameSrc = "ProductName here with a wrap to a 2nd line and truncation at the second lines here with a line clamp",
  hrCellOffHookSrc = "$0.00 Off",
  hrCellOffByVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  hrCellOffTypeSrc = "in store",
  hrCellOffLimitSrc = "limit 2",
  hrCellOffActClick = {},
  hrCellOffCellClick = {},
  bodySecMap,
  categories = true,
  featured = true,
  prodOff = true,
  brands = true,
}) {
  return (
    <_Component tag="div">
      <_Builtin.Layout
        className={_utils.cx(_styles, "bqg-qs")}
        id={_utils.cx(
          _styles,
          "w-node-_155e6fe4-5edd-fcfc-302e-d4933d05816b-3d05816a"
        )}
      >
        <_Builtin.Cell
          className={_utils.cx(_styles, "ps-hero", "_4peep2")}
          id={_utils.cx(
            _styles,
            "w-node-_155e6fe4-5edd-fcfc-302e-d4933d05816c-3d05816a"
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
            "w-node-_155e6fe4-5edd-fcfc-302e-d4933d058176-3d05816a"
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
            <SecOffer
              sec={highRate}
              conCellMap={hrMap}
              conExampleCell={exampleHighRateCell}
              exampleVizSrc={hrCellOffVizSrc}
              exampleVizAlt={hrCellOffVizAlt}
              exampleNameSrc={hrCellOffNameSrc}
              exampleHookSrc={hrCellOffHookSrc}
              exampleByVizSrc={hrCellOffByVizSrc}
              exampleTypeSrc={hrCellOffTypeSrc}
              exampleLimitSrc={hrCellOffLimitSrc}
              exampleActClick={hrCellOffActClick}
              exampleCellClick={hrCellOffCellClick}
              secHeadTitleSrc="Highly Rated Deals"
            />
          </_Builtin.Section>
        </_Builtin.Cell>
        <_Builtin.Cell
          className={_utils.cx(_styles, "ps-grid")}
          id={_utils.cx(
            _styles,
            "w-node-_155e6fe4-5edd-fcfc-302e-d4933d05818a-3d05816a"
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
                exampleNameSrc="ProductName"
                exampleHookSrc="$0.00 Off"
                exampleActClick={{}}
                exampleCellClick={{}}
                conCellMap=""
                offer={true}
                brand={false}
                secHeadTitleSrc="Featured Deals"
                conExampleBrandCell={false}
              />
              <GridSecOffer sec={prodOff} />
              <SecBrand sec={brands} secHeadTitleSrc="Popular Brands" />
            </>
          )}
        </_Builtin.Cell>
      </_Builtin.Layout>
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="main">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-70-30")}
          id={_utils.cx(
            _styles,
            "w-node-_5684e3d2-727d-0b47-19c6-2b00dac95135-3d05816a"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-hero")}
            id={_utils.cx(
              _styles,
              "w-node-_5684e3d2-727d-0b47-19c6-2b00dac95136-3d05816a"
            )}
          />
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-act")}
            id={_utils.cx(
              _styles,
              "w-node-_5684e3d2-727d-0b47-19c6-2b00dac95137-3d05816a"
            )}
          />
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-grid")}
            id={_utils.cx(
              _styles,
              "w-node-_5684e3d2-727d-0b47-19c6-2b00dac95138-3d05816a"
            )}
          />
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
