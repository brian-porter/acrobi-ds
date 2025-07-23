"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { InputWBtns } from "./InputWBtns";
import { BtnBarSs } from "./BtnBarSs";
import { SecList } from "./SecList";
import { SecHead } from "./SecHead";
import { GridSecProduct } from "./GridSecProduct";
import * as _utils from "./utils";
import _styles from "./PList3.module.css";

export function PList3({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  heroHlineSrc = "{ListName}",
  heroSubtxtSrc = "Subhead description below",
  heroQrClick = {},
  heroMoreClick = {},
  scanQrBtnClick = {},
  searchFldClick = {},
  addItmClick = {},
  calDis = "true",
  calClick = {},
  nearbyDis = "true",
  nearbyClick = {},
  alertClick = {},
  settingClick = {},
  trendMap,
  exampleTrending = true,
  itmGrid = true,
  itmMap,
  empty = false,
  emptyScanClick = {},
  emptyDiscoverClick = {},
  emptyAddClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="div">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-70-30")}
          id={_utils.cx(
            _styles,
            "w-node-_8a7fbd06-401f-fb20-9d18-1ace975f90e2-68292005"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-hero")}
            id={_utils.cx(
              _styles,
              "w-node-_8a7fbd06-401f-fb20-9d18-1ace975f90e3-68292005"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "hero_sec")}
              grid={{
                type: "section",
              }}
              tag="section"
            >
              <Hero
                imgSrc={heroImgSrc}
                hlineHlineSrc={heroHlineSrc}
                hlineHlineSubtxtSrc={heroSubtxtSrc}
                icnBarIcnBarL1Click={heroQrClick}
                icnBarIcnBarR1Click={heroMoreClick}
                heroAsp="21-9"
                fadeBtm={false}
                hlineHlineLoc="btm"
                icnBar={true}
                icnBarIcnBarR1Src="Moreh"
                icnBarIcnBarL1Src="Qr"
                img={true}
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-act")}
            id={_utils.cx(
              _styles,
              "w-node-_8a7fbd06-401f-fb20-9d18-1ace975f90e6-68292005"
            )}
          >
            <_Builtin.Section
              className={_utils.cx(_styles, "act-sec")}
              grid={{
                type: "section",
              }}
              tag="section"
            >
              <InputWBtns
                fldFldClick={searchFldClick}
                fldFldTBtn={false}
                tTBtn={false}
              />
              <BtnBarSs
                btn2Click={calClick}
                btn3Click={nearbyClick}
                btn4Click={alertClick}
                btn8Click={settingClick}
                btn1Click={addItmClick}
                btn2Dis={calDis}
                btn3Dis={nearbyDis}
                btn1TxtSrc="Add Item"
                btn1IcnSrc="addcirc"
                btn1Id="create"
                btn2TxtSrc="Calendar"
                btn2IcnSrc="cal"
                btn2Id="calendar"
                btn3TxtSrc="Nearby"
                btn3IcnSrc="geo_myloc"
                btn3Id="near"
                btn4IcnSrc="alarm"
                btn4TxtSrc="Alerts"
                btn4Id="alert"
                btn8IcnSrc="setting"
                btn8TxtSrc="Settings"
                btn8={true}
                btn5={false}
                btn7Id=""
                btn8Id="settings"
                slotId="L3Btns"
              />
              <SecList
                conCellMap={trendMap}
                conCellExample={exampleTrending}
                secHeadTitleSrc="Trending"
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-grid")}
            id={_utils.cx(
              _styles,
              "w-node-_8a7fbd06-401f-fb20-9d18-1ace975f90ec-68292005"
            )}
          >
            <SecHead titleSrc="Items" act1={false} sz="l" titleSz="h4" />
            <GridSecProduct
              sec={itmGrid}
              conCellMap={itmMap}
              emptyEmpty={empty}
              emptySecBtnClick={emptyScanClick}
              emptyTirBtnClick={emptyDiscoverClick}
              emptyPrimeBtnClick={emptyAddClick}
              secHeadTitleSrc="Items"
              secHead={false}
            />
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
