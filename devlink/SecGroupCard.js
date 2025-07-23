"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { CardGroupData } from "./CardGroupData";
import { BarSs } from "./BarSs";
import * as _utils from "./utils";
import _styles from "./SecGroupCard.module.css";

export function SecGroupCard({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  secHeadTitleIcn = true,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "group",
  secHeadTitleSrc = "Groups",
  secHeadAct1TxtSrc = "See All",
  secHeadAct1Click = {},
  conSideFade = false,
  conCellMap,
  conExampleCell = true,
  exampleSimple = true,
  exampleCover = false,
  exampleAvtr2 = false,
  exampleAvtr3 = false,
  exampleAvtr4 = false,
  exampleAvtr5 = false,
  exampleAvtr1Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  exampleAvtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  exampleAvtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  exampleAvtr4Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  exampleAvtr5Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exampleVizAltSrc = "__wf_reserved_inherit",
  exampleTitleSrc = "GroupName",
  exampleProfClick = {},
  exampleChatBtnClick = {},
  exampleMoreBtnClick = {},
  exampleExampleRoom = true,
  exampleExampleGallery = true,
  exampleRoomMap,
  exampleGalMap,
  exampleAtchMap,
  examplePplMap,
  exampleStats = true,
  exampleStat1Src = "stat1",
  exampleStat2Src = "stat2",
  exampleStat3Src = "stat3",
  exampleStat4Src = "stat4",
  exampleStat2 = true,
  exampleStat3 = true,
  exampleStat4 = true,
  emptyEmpty = false,
  emptyEmptyIcnSrc = "group",
  emptyEmptyHlineSrc = "No Groups Found",
  emptyEmptySubTxtSrc = "Add or join a group",
  emptyEmptyCtaTxtSrc = "Create A Group",
  emptyEmptyClick = {},
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "groupcard-sec")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        titleIcnSrc={secHeadTitleIcnSrc}
        titleSrc={secHeadTitleSrc}
        titleIcn={secHeadTitleIcn}
        act1={secHeadAct1}
        secHead={secHead}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1Click={secHeadAct1Click}
        titleIcnClr="n500"
      />
      {conExampleCell ? (
        <_Builtin.Block className={_utils.cx(_styles, "example-ss")} tag="div">
          <CardGroupData
            simple={exampleSimple}
            cover={exampleCover}
            avtr2={exampleAvtr2}
            avtr3={exampleAvtr3}
            avtr4={exampleAvtr4}
            avtr5={exampleAvtr5}
            avtr1Src={exampleAvtr1Src}
            avtr2Src={exampleAvtr2Src}
            avtr3Src={exampleAvtr3Src}
            avtr4Src={exampleAvtr4Src}
            avtr5Src={exampleAvtr5Src}
            titleSrc={exampleTitleSrc}
            profClick={exampleProfClick}
            chatBtnClick={exampleChatBtnClick}
            moreBtnClick={exampleMoreBtnClick}
            exampleRoom={exampleExampleRoom}
            exampleGallery={exampleExampleGallery}
            roomMap={exampleRoomMap}
            galMap={exampleGalMap}
            atchMap={exampleAtchMap}
            pplMap={examplePplMap}
            stats={exampleStats}
            stat1Src={exampleStat1Src}
            stat2Src={exampleStat2Src}
            stat3Src={exampleStat3Src}
            stat4Src={exampleStat4Src}
            stat2={exampleStat2}
            stat3={exampleStat3}
            stat4={exampleStat4}
            cvrImgSrc={exampleVizSrc}
            cvrAltSrc={exampleVizAltSrc}
          />
          <CardGroupData cover={true} simple={false} />
        </_Builtin.Block>
      ) : null}
      <BarSs
        barMap={conCellMap}
        sideFade={conSideFade}
        empty={emptyEmpty}
        emptyIcnSrc={emptyEmptyIcnSrc}
        emptyHlineSrc={emptyEmptyHlineSrc}
        emptyCtaTxtSrc={emptyEmptyCtaTxtSrc}
        emptySubTxtSrc={emptyEmptySubTxtSrc}
        emptyClick={emptyEmptyClick}
        slotId="obj-data"
      />
    </_Component>
  ) : null;
}
