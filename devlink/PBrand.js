"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { InputWBtns } from "./InputWBtns";
import { BtnBarSs } from "./BtnBarSs";
import { SecProduct } from "./SecProduct";
import { SnipSecRank } from "./SnipSecRank";
import { SnipSecFavs } from "./SnipSecFavs";
import * as _utils from "./utils";
import _styles from "./PBrand.module.css";

export function PBrand({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  heroAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/66957adac2563976c13c0bcd_Brand.svg",
  heroName = "BrandName",
  heroSubtxtSrc = "@handle",
  heroQrClick = {},
  heroMoreClick = {},
  heroBtn = true,
  heroBtnClick = {},
  scanQrBtnClick = {},
  searchFldClick = {},
  favClick = {},
  chatClick = {},
  honorClick = {},
  alertClick = {},
  popMap,
  examplePopProduct = true,
  examplePopVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif",
  examplePopVizAlt = "__wf_reserved_inherit",
  examplePopActClick = {},
  rank = true,
  peep = true,
  examplePopCellClick = {},
  list = true,
  offer = true,
  brand = true,
  places = true,
  activity = true,
  body1Map,
  body2Map,
  body3Map,
  body4Map,
  body5Map,
  body6Map,
  body7Map,
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="main">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-70-30")}
          id={_utils.cx(
            _styles,
            "w-node-_408da009-0d19-63d7-999b-688684f854e5-0500470f"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-hero")}
            id={_utils.cx(
              _styles,
              "w-node-_408da009-0d19-63d7-999b-688684f854e6-0500470f"
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
                btn={heroBtn}
                imgSrc={heroImgSrc}
                icnBarIcnBarL1Click={heroQrClick}
                icnBarIcnBarR1Click={heroMoreClick}
                btnBtnClick={heroBtnClick}
                avtrAvtrSrc={heroAvtrSrc}
                avtrAvtrHlineSrc={heroName}
                avtrAvtrSubTxtSrc={heroSubtxtSrc}
                hlineHlineSubtxt={true}
                btnBtnTxtSrc="Connect"
                btnBtnIcnSrc="Addcirc"
                btnBtnTxt={true}
                icnBarIcnBarR1Src="Moreh"
                icnBar={true}
                hlineHlineLoc="btm"
                fadeBtm={false}
                avtr={true}
                hline={false}
                avtrAvtrHline={true}
                heroAsp="21-9"
                icnBarIcnBarL1Src="Qr"
                avtrAvtrShape="r"
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-act")}
            id={_utils.cx(
              _styles,
              "w-node-_408da009-0d19-63d7-999b-688684f854e7-0500470f"
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
                fldFldClick={searchFldClick}
                fldFldTBtn={false}
                tTBtn={false}
              />
              <BtnBarSs
                btn2Click={chatClick}
                btn3Click={honorClick}
                btn4Click={alertClick}
                btn1Click={favClick}
                btn1TxtSrc="Favorite"
                btn2TxtSrc="Message"
                btn3TxtSrc="Honor"
                btn4TxtSrc="Alerts"
                btn3IcnSrc="rank_lvl2"
                btn3Id="honor"
                btn2IcnSrc="chat"
                btn2Id="add-to"
                btn1Id="favs"
                btn4Id="alert"
                btn4IcnSrc="alarm"
                btn1IcnSrc="favs"
                btn5={false}
                btn8TxtSrc="Settings"
                btn8IcnSrc="setting"
                btn8Id="settings"
                btn3Dis="true"
              />
              <SecProduct
                conCellMap={popMap}
                conExampleCell={examplePopProduct}
                exampleVizSrc={examplePopVizSrc}
                exampleVizAlt={examplePopVizAlt}
                exampleActClick={examplePopActClick}
                exampleCellClick={examplePopCellClick}
                secHeadTitleSrc="Popular Products"
                secHeadTitleIcn={true}
                exampleCapt={false}
                secHeadTitleIcnSrc="prod"
              />
            </_Builtin.Section>
          </_Builtin.Cell>
        </_Builtin.Layout>
        <_Builtin.Layout
          className={_utils.cx(_styles, "stk-50-50")}
          id={_utils.cx(
            _styles,
            "w-node-_63df2507-1c5d-4043-11ee-1dba05004731-0500470f"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "cell-clamp")}
            id={_utils.cx(
              _styles,
              "w-node-_63df2507-1c5d-4043-11ee-1dba05004732-0500470f"
            )}
          >
            {body1Map ?? (
              <>
                <SnipSecRank sec={rank} />
                <SnipSecFavs />
              </>
            )}
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "cell-clamp")}
            id={_utils.cx(
              _styles,
              "w-node-_63df2507-1c5d-4043-11ee-1dba0500478f-0500470f"
            )}
          >
            {body2Map ?? (
              <_Builtin.HtmlEmbed value="%3C!--%20Peep%20-%20SnipSec%20Component%20mapped%20here%20--%3E" />
            )}
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "cell-clamp")}
            id={_utils.cx(
              _styles,
              "w-node-_63df2507-1c5d-4043-11ee-1dba050047d0-0500470f"
            )}
          >
            {body3Map ?? (
              <_Builtin.HtmlEmbed value="%3C!--%20List%20-%20SnipSec%20Component%20mapped%20here%20--%3E" />
            )}
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "cell-clamp")}
            id={_utils.cx(
              _styles,
              "w-node-_63df2507-1c5d-4043-11ee-1dba05004801-0500470f"
            )}
          >
            {body4Map ?? (
              <_Builtin.HtmlEmbed value="%3C!--%20Offer%20-%20SnipSec%20Component%20mapped%20here%20--%3E" />
            )}
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "cell-clamp")}
            id={_utils.cx(
              _styles,
              "w-node-_63df2507-1c5d-4043-11ee-1dba05004834-0500470f"
            )}
          >
            {body5Map ?? (
              <_Builtin.HtmlEmbed value="%3C!--%20Brand%20-%20SnipSec%20Component%20mapped%20here%20--%3E" />
            )}
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "cell-clamp")}
            id={_utils.cx(
              _styles,
              "w-node-_63df2507-1c5d-4043-11ee-1dba0500484c-0500470f"
            )}
          >
            {body6Map ?? (
              <_Builtin.HtmlEmbed value="%3C!--%20Places%20-%20SnipSec%20Component%20mapped%20here%20--%3E" />
            )}
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "cell-clamp")}
            id={_utils.cx(
              _styles,
              "w-node-_63df2507-1c5d-4043-11ee-1dba0500487d-0500470f"
            )}
          >
            {body7Map ?? (
              <_Builtin.HtmlEmbed value="%3C!--%20Activity%20-%20SnipSec%20Component%20mapped%20here%20--%3E" />
            )}
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
