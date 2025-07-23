"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { InputWBtns } from "./InputWBtns";
import { BtnBarSs } from "./BtnBarSs";
import { SecList } from "./SecList";
import { SecHead } from "./SecHead";
import { L2Grid } from "./L2Grid";
import { EmptyCollection } from "./EmptyCollection";
import * as _utils from "./utils";
import _styles from "./PList2.module.css";

export function PList2({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  heroHlineSrc = "List Type",
  heroSubtxtSrc = "Subhead description below",
  heroQrClick = {},
  heroMoreClick = {},
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
  trendClick = {},
  empty = false,
  emptyFriendClick = {},
  emptyDiscoverClick = {},
  emptyAddClick = {},
  l2Grid = true,
  l2Map,
  l2CellExample = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="main">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-70-30")}
          id={_utils.cx(
            _styles,
            "w-node-a947f06b-e2c2-0c10-41d2-b306eab2f522-5e2c465f"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-hero")}
            id={_utils.cx(
              _styles,
              "w-node-a947f06b-e2c2-0c10-41d2-b306eab2f523-5e2c465f"
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
                hlineHlineLoc="btm"
                fadeBtm={false}
                heroAsp="21-9"
                icnBar={true}
                icnBarIcnBarR1Src="Moreh"
                icnBarIcnBarR1Link={{
                  href: "#",
                }}
                icnBarIcnBarL1Link={{
                  href: "#",
                }}
                icnBarIcnBarL1Src="Qr"
                btn={false}
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-act")}
            id={_utils.cx(
              _styles,
              "w-node-_245abb67-27a6-52b5-82f8-9e84facddc58-5e2c465f"
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
                fldFldOnChange=""
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
                btn8TxtSrc="Settings"
                btn8IcnSrc="setting"
                btn8Id="settings"
                btn5={false}
                btn8={true}
              />
            </_Builtin.Section>
            <SecList
              conCellMap={trendMap}
              exampleCellClick={trendClick}
              secHeadTitleSrc="Trending"
              exampleCellCard="true"
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-grid")}
            id={_utils.cx(
              _styles,
              "w-node-a947f06b-e2c2-0c10-41d2-b306eab2f52c-5e2c465f"
            )}
          >
            <SecHead titleSrc="My Lists" act1={false} sz="l" titleSz="h4" />
            <L2Grid
              l2Map={l2Map}
              l2Grid={l2Grid}
              cellExample={l2CellExample}
              pin={false}
              bookmark={true}
              chat={true}
              event={true}
              alert={true}
            />
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
              tirBtn={true}
              tirBtnTxtSrc=""
              secBtnTxtSrc="Find Friend's Lists"
            />
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
