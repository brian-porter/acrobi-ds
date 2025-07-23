"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { InputWBtns } from "./InputWBtns";
import { BtnBarSs } from "./BtnBarSs";
import { SecList } from "./SecList";
import { SecHead } from "./SecHead";
import { L1Grid } from "./L1Grid";
import { EmptyCollection } from "./EmptyCollection";
import * as _utils from "./utils";
import _styles from "./PList1.module.css";

export function PList1({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  heroHlineSrc = "Life's Lists",
  heroSubtxtSrc = "Create & Share with Anyone",
  heroQrClick = {},
  heroMoreClick = {},
  heroMoreMap,
  heroEditBtn = false,
  heroEditBtnClick = {},
  scanQrBtnClick = {},
  searchFldClick = {},
  createClick = {},
  calDis = "true",
  calClick = {},
  alertClick = {},
  captureDis = "true",
  captureClick = {},
  settingClick = {},
  trendMap,
  empty = false,
  emptyFriendClick = {},
  emptyDiscoverClick = {},
  emptyAddClick = {},
  l1Grid = true,
  l1Map,
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="main">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-70-30")}
          id={_utils.cx(
            _styles,
            "w-node-_81525e70-b310-9859-d19d-b130ad4b5b41-f8fe0299"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-hero")}
            id={_utils.cx(
              _styles,
              "w-node-_04a844dc-1d5b-c415-f8d4-a278f0ad26a1-f8fe0299"
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
                btn={heroEditBtn}
                btnBtnClick={heroEditBtnClick}
                hlineHlineSubtxt={true}
                fadeBtm={false}
                heroAsp="21-9"
                hlineHlineLoc="btm"
                icnBar={true}
                icnBarIcnBarR1Src="Moreh"
                icnBarIcnBarL1Src="Qr"
                avtr={false}
                bnr={false}
                hlineHlineAlign="l"
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-act")}
            id={_utils.cx(
              _styles,
              "w-node-f1a1e083-ef1c-80c5-25e0-49732fa55d3c-f8fe0299"
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
                lLBtnClick={scanQrBtnClick}
                fldFldClick={searchFldClick}
                tTBtnIcnSrc="filter"
                fldFldTBtn={false}
                tTBtn={false}
              />
              <BtnBarSs
                btn2Click={calClick}
                btn3Click={alertClick}
                btn4Click={captureClick}
                btn8Click={settingClick}
                btn1Click={createClick}
                btn2Dis={calDis}
                btn4Dis={captureDis}
                btn1TxtSrc="Create"
                btn1IcnSrc="act_addcirc"
                btn1Id="create"
                btn2TxtSrc="Calendar"
                btn2IcnSrc="cal"
                btn2Id="calendar"
                btn3TxtSrc="Alerts"
                btn3IcnSrc="alarm"
                btn3Id="alerts"
                btn4IcnSrc="vid"
                btn4TxtSrc="Capture"
                btn4Id="capture"
                btn5TxtSrc="Settings"
                btn5IcnSrc="setting"
                btn5Id="settings"
                btn5={false}
                btn8={true}
                btn8IcnSrc="setting"
                btn8TxtSrc="Settings"
                btn8Id="setting"
                sideFade={true}
                slotId="L1Btns"
              />
            </_Builtin.Section>
            <SecList
              conCellMap={trendMap}
              secHeadTitleSrc="Trending"
              exampleCellCard="true"
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-grid")}
            id={_utils.cx(
              _styles,
              "w-node-b9bf3acc-3609-e1fd-92a5-97143ef16704-f8fe0299"
            )}
          >
            <SecHead titleSrc="My Lists" act1={false} titleSz="h4" />
            <L1Grid l1Grid={l1Grid} l1Map={l1Map} slotId="list" />
            <EmptyCollection
              empty={empty}
              primeBtnClick={emptyAddClick}
              secBtnClick={emptyFriendClick}
              tirBtnClick={emptyDiscoverClick}
              icnSrc="bookmark_item"
              headlineSrc="Oops, You Need a List"
              subtxtSrc="Use the links below to make or find a list. Next time they'll show up here to choose from."
              primeBtnTxtSrc="Create a List"
              secBtn={true}
              secBtnTxtSrc="Find Friend's Lists"
              tirBtn={true}
              tirBtnTxtSrc="Discover New Lists"
            />
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
