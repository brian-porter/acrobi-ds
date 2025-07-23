"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { InputWBtns } from "./InputWBtns";
import { BtnBarSs } from "./BtnBarSs";
import { SecPeep } from "./SecPeep";
import { SecHead } from "./SecHead";
import { P2Grid } from "./P2Grid";
import { EmptyCollection } from "./EmptyCollection";
import * as _utils from "./utils";
import _styles from "./PGroup2.module.css";

export function PGroup2({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  heroHlineSrc = "GroupType",
  heroSubtxtSrc = "@handle",
  heroSubtxt = false,
  heroQrClick = {},
  heroMoreClick = {},
  heroBtn = true,
  heroBtnClick = {},
  scanQrBtnClick = {},
  searchClick = {},
  addGroupClick = {},
  calClick = {},
  alertClick = {},
  captClick = {},
  settingClick = {},
  peepMap,
  exampleTopPeep = true,
  g2Map,
  p2Grid = true,
  p2Map,
  p2Empty = false,
  p2EmptyFindClick = {},
  p2EmptyAddClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="main">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-70-30")}
          id={_utils.cx(
            _styles,
            "w-node-cac43235-69f5-5419-f9ea-606e79f69c4e-48802d43"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-hero")}
            id={_utils.cx(
              _styles,
              "w-node-cac43235-69f5-5419-f9ea-606e79f69c4f-48802d43"
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
                hlineHlineSubtxt={heroSubtxt}
                hlineHlineSubtxtSrc={heroSubtxtSrc}
                btn={heroBtn}
                imgSrc={heroImgSrc}
                icnBarIcnBarL1Click={heroQrClick}
                icnBarIcnBarR1Click={heroMoreClick}
                btnBtnClick={heroBtnClick}
                icnBar={true}
                icnBarIcnBarR1Src="Moreh"
                heroAsp="21-9"
                btnBtnTxtSrc="Add"
                btnBtnTxt={true}
                btnBtnIcnSrc="Photo"
                icnBarIcnBarL1Src="Qr"
                fadeBtm={false}
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-act")}
            id={_utils.cx(
              _styles,
              "w-node-cac43235-69f5-5419-f9ea-606e79f69c50-48802d43"
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
                tTBtnIcnSrc="filter"
                tTBtnTxtSrc="Filter"
                tTBtn={false}
              />
              <BtnBarSs
                btn1Click={addGroupClick}
                btn2Click={calClick}
                btn3Click={alertClick}
                btn4Click={captClick}
                btn8Click={settingClick}
                btn1TxtSrc="Create Group"
                btn1IcnSrc="group"
                btn1Id="add"
                btn2TxtSrc="Calendar"
                btn2IcnSrc="cal"
                btn2Id="cal"
                btn3TxtSrc="Alerts"
                btn3IcnSrc="alarm"
                btn3Id="alerts"
                btn4IcnSrc="vid"
                btn4TxtSrc="Capture"
                btn4Id="capture"
                btn4={true}
                btn2Dis="true"
                btn4Dis="true"
                btn8TxtSrc="Settings"
                btn8IcnSrc="setting"
                btn8Id="settings"
                btn8={true}
                btn5={false}
              />
              <SecPeep
                conCellMap={peepMap}
                secHeadTitleSrc="Top Contributors"
                secHeadTitleIcnSrc="assign"
                stats={false}
              />
            </_Builtin.Section>
          </_Builtin.Cell>
        </_Builtin.Layout>
        <_Builtin.Section
          className={_utils.cx(_styles, "g2-sec-group")}
          tag="section"
          grid={{
            type: "section",
          }}
        >
          <SecHead
            titleSrc="Groups"
            titleIcn={true}
            titleIcnSrc="group"
            act1={false}
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "card-collection")}
            tag="div"
            id="group"
          >
            {g2Map}
          </_Builtin.Block>
        </_Builtin.Section>
        <_Builtin.Section
          className={_utils.cx(_styles, "p2-sec-peep")}
          grid={{
            type: "section",
          }}
          tag="section"
        >
          <SecHead
            act1={false}
            titleSrc="Peeps"
            titleIcn={true}
            titleIcnSrc="peep"
          />
          <P2Grid p2Map={p2Map} p2Grid={p2Grid} exampleP2Object={true} />
          <EmptyCollection
            empty={p2Empty}
            primeBtnClick={p2EmptyAddClick}
            secBtnClick={p2EmptyFindClick}
            secBtn={true}
            tirBtn={false}
            headlineSrc="Empty Group"
            icnSrc="group"
            subtxtSrc="Use the links below to add people to this group. Next time they will show up here with a summary of their recent activities."
            primeBtnTxtSrc="Add Members"
            secBtnTxtSrc="Find Friends"
          />
        </_Builtin.Section>
      </_Builtin.Block>
    </_Component>
  );
}
