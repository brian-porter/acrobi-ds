"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { InputWBtns } from "./InputWBtns";
import { BtnBarSs } from "./BtnBarSs";
import { SecPeep } from "./SecPeep";
import { SecGroup } from "./SecGroup";
import { SecPeepCard } from "./SecPeepCard";
import { GridSecActivity } from "./GridSecActivity";
import * as _utils from "./utils";
import _styles from "./PPeep1.module.css";

export function PPeep1({
  as: _Component = _Builtin.Block,
  heroImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  heroHlineSrc = "Find Your Peeps",
  heroSubtxtSrc = "Add connections to share the experience",
  heroMoreClick = {},
  heroQrClick = {},
  heroBtnClick = {},
  scanQrBtnClick = {},
  searchClick = {},
  findFriendClick = {},
  addGroupClick = {},
  chatClick = {},
  alertClick = {},
  topPeepMap,
  topPeepExample = true,
  topGroup = true,
  topGroupMap,
  topGroupExample = true,
  groupAllClick = {},
  pins = true,
  pinMap,
  pinExample = true,
  activityMap,
  activityExample = true,
  body1Map,
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="div">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-70-30")}
          id={_utils.cx(
            _styles,
            "w-node-_8cd62bd1-7e18-ec92-bb42-0ff9a7653ddc-f244fc14"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-hero")}
            id={_utils.cx(
              _styles,
              "w-node-_8cd62bd1-7e18-ec92-bb42-0ff9a7653ddd-f244fc14"
            )}
          >
            <Hero
              hlineHlineSubtxtSrc={heroSubtxtSrc}
              hlineHlineSrc={heroHlineSrc}
              icnBarIcnBarL1Click={heroQrClick}
              icnBarIcnBarR1Click={heroMoreClick}
              imgSrc={heroImgSrc}
              btnBtnClick={heroBtnClick}
              btn={true}
              hlineHlineSubtxt={true}
              btnBtnTxtSrc="Find Friends"
              btnBtnIcnSrc="Member"
              icnBarIcnBarR1Src="Moreh"
              icnBar={true}
              hlineHlineLoc="btm"
              fadeBtm={false}
              avtrAvtrHline={true}
              heroAsp="21-9"
              btnBtnTxt={true}
              avtrAvtrHlineSrc="FName LI"
              icnBarIcnBarL1Src="Qr"
              sec={true}
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-act")}
            id={_utils.cx(
              _styles,
              "w-node-_8cd62bd1-7e18-ec92-bb42-0ff9a7653de5-f244fc14"
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
                fldFldClick={searchClick}
                fldFldTBtn={false}
                tTBtn={false}
              />
              <BtnBarSs
                btn2Click={addGroupClick}
                btn3Click={chatClick}
                btn1Click={findFriendClick}
                btn4Click={alertClick}
                btn1TxtSrc="Find Friends"
                btn1IcnSrc="member"
                btn1Id="find"
                btn2TxtSrc="Create Group"
                btn2IcnSrc="group"
                btn2Id="group"
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
                slotId="peep1btns"
              />
              <SecPeep
                conCellMap={topPeepMap}
                stats={false}
                secHeadTitleIcnSrc="assign"
                secHeadTitleSrc="Top Contributors"
                exampleCellCard="true"
                exampleBtn={true}
              />
            </_Builtin.Section>
          </_Builtin.Cell>
          <_Builtin.Cell
            className={_utils.cx(_styles, "ps-grid")}
            id={_utils.cx(
              _styles,
              "w-node-_8cd62bd1-7e18-ec92-bb42-0ff9a7653df8-f244fc14"
            )}
          >
            {body1Map ?? (
              <>
                <SecGroup
                  sec={topGroup}
                  secHeadAct1Click={groupAllClick}
                  conCellMap={topGroupMap}
                  secHeadTitleSrc="Popular Groups"
                  secHeadTitleIcn={true}
                  secHeadAct1={true}
                  secHeadTitleIcnSrc="group"
                />
                <SecPeepCard
                  conCellMap={pinMap}
                  conExampleCell={pinExample}
                  sec={pins}
                  secHeadTitleIcnSrc="pin"
                  secHeadTitleSrc="Pins"
                />
                <GridSecActivity
                  conCellMap={activityMap}
                  conExampleCell={activityExample}
                />
              </>
            )}
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
