"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { InputWBtns } from "./InputWBtns";
import { BtnBarSs } from "./BtnBarSs";
import { SecPeep } from "./SecPeep";
import { SecGroupCard } from "./SecGroupCard";
import { GridSecActivity } from "./GridSecActivity";
import * as _utils from "./utils";
import _styles from "./PPeep2.module.css";

export function PPeep2({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  heroHlineSrc = "{PeepType}",
  heroSubtxtSrc = "Subhead description below",
  heroSubtxt = false,
  heroQrClick = {},
  heroMoreClick = {},
  heroBtn = true,
  heroBtnClick = {},
  scanQrBtnClick = {},
  addGroupClick = {},
  chatClick = {},
  addMbrClick = {},
  alertClick = {},
  settingClick = {},
  topPeepMap,
  exampleTopPeep = true,
  group = true,
  groupMap,
  exampleGroup = true,
  peepMap,
  examplePeep = true,
  empty = false,
  emptyFindClick = {},
  emptyGroupClick = {},
  emptyBrandClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="div">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-70-30")}
          id={_utils.cx(
            _styles,
            "w-node-_09db2c0c-3cf5-6a78-dc35-abd68a85d38a-2213e089"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-hero")}
            id={_utils.cx(
              _styles,
              "w-node-_09db2c0c-3cf5-6a78-dc35-abd68a85d38b-2213e089"
            )}
          >
            <Hero
              hlineHlineSrc={heroHlineSrc}
              btn={heroBtn}
              imgSrc={heroImgSrc}
              hlineHlineSubtxtSrc={heroSubtxtSrc}
              hlineHlineSubtxt={heroSubtxt}
              icnBarIcnBarL1Click={heroQrClick}
              icnBarIcnBarR1Click={heroMoreClick}
              btnBtnClick={heroBtnClick}
              btnBtnIcnSrc="Photo"
              btnBtnTxtSrc="Add"
              btnBtnTxt={true}
              icnBar={true}
              icnBarIcnBarR1Src="Moreh"
              heroAsp="21-9"
              fadeBtm={false}
              hlineHlineLoc="btm"
              icnBarIcnBarL1Src="Qr"
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-act")}
            id={_utils.cx(
              _styles,
              "w-node-_09db2c0c-3cf5-6a78-dc35-abd68a85d393-2213e089"
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
                fldFldTBtn={false}
                tTBtn={false}
              />
              <BtnBarSs
                btn2Click={chatClick}
                btn3Click={addMbrClick}
                btn4Click={alertClick}
                btn8Click={settingClick}
                btn1TxtSrc="Create Group"
                btn2TxtSrc="Message"
                btn3TxtSrc="Add Member"
                btn4TxtSrc="Alerts"
                btn3IcnSrc="peep_add"
                btn3Id="add-member"
                btn2IcnSrc="chat"
                btn2Id="chat"
                btn1Id="add-group"
                btn4Id="alert"
                btn4IcnSrc="alarm"
                btn1IcnSrc="group"
                btn8TxtSrc="Settings"
                btn8IcnSrc="setting"
                btn8Id="settings"
                btn8={true}
                btn5={false}
              />
              <SecPeep
                conCellMap={topPeepMap}
                conExampleCell={exampleTopPeep}
                secHeadTitleIcnSrc="assign"
                secHeadTitleSrc="Top Contributors"
                stats={false}
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-grid")}
            id={_utils.cx(
              _styles,
              "w-node-_09db2c0c-3cf5-6a78-dc35-abd68a85d3a6-2213e089"
            )}
          >
            <SecGroupCard
              sec={group}
              conCellMap={groupMap}
              conExampleCell={exampleGroup}
            />
            <GridSecActivity
              conCellMap={peepMap}
              conExampleCell={examplePeep}
              emptyEmpty={empty}
              emptyPrimeBtnClick={emptyFindClick}
              emptySecBtnClick={emptyGroupClick}
              emptyTirBtnClick={emptyBrandClick}
              secHeadTitleIcnSrc="peep"
              secHeadTitleSrc="Peeps"
              sec={true}
            />
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
