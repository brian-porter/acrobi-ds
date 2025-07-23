"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Spacer } from "./Spacer";
import { ListItmCtrl } from "./ListItmCtrl";
import { SecPeep } from "./SecPeep";
import { AcrdSec } from "./AcrdSec";
import { Bbc } from "./Bbc";
import * as _utils from "./utils";
import _styles from "./MMemberList.module.css";

export function MMemberList({
  as: _Component = _Builtin.Block,
  mbrList = true,
  itmGttrBdgPin = false,
  itmGttrBdgAlarm = false,
  itmGttrBdgBkmrk = false,
  moreClick = {},
  anc = true,
  ancFetrExample = true,
  ancFetrAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  ancFetrAvtrAlt = "__wf_reserved_inherit",
  ancFetrTitleSrc = "FName LName",
  ancFetrSubtxtSrc = "@handle",
  ancFetrClick = {},
  ancNewMap,
  ancNewExample = true,
  ancNewAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  ancNewAvtrAlt = "__wf_reserved_inherit",
  ancNewClick = {},
  ancFetrStat1Src = "34 online",
  ancFetrStat2Src = "256 members",
  mbrAddClick = {},
  adminSecClick = {},
  adminSecSubMap,
  adminExample = true,
  adminAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  adminAvtrAlt = "__wf_reserved_inherit",
  adminTitleSrc = "FName LName",
  adminSubtxtSrc = "@handle",
  adminClick = {},
  mbrSecIcn = "default",
  mbrSecName = "RoleName",
  mbrSecClick = {},
  mbrSecSubMap,
  mbrExample = true,
  mbrAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  mbrAvtrAlt = "__wf_reserved_inherit",
  mbrTitleSrc = "FName LName",
  mbrSubtxtSrc = "members relation to me",
  mbrClick = {},
  mbrMoreClick = {},
}) {
  return mbrList ? (
    <_Component className={_utils.cx(_styles, "member_list")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={moreClick}
          gttrBdgPin={itmGttrBdgPin}
          gttrBdgAlarm={itmGttrBdgAlarm}
          gttrBdgBkmrk={itmGttrBdgBkmrk}
          titleSrc="Members"
          sz="l"
          titleSz="r1b"
          act1TxtSrc="More"
          act1IcnSrc="Moreh"
          act1Txt={false}
          act1Icn={true}
          act2={false}
          act2Txt={false}
          act1Clr="n500"
          act1={true}
          act1Styl="nt"
          subtxt={false}
          act2TxtSrc="Filter"
          act2IcnSrc=""
          secHead={true}
          titleClick={{}}
          subtxtSrc="xx people"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <Spacer szDep="8" size="8" />
        {anc ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "featured-itms")}
            tag="div"
          >
            <Spacer szDep="8" size="8" />
            <_Builtin.Section
              className={_utils.cx(_styles, "announce_sec")}
              tag="section"
              grid={{
                type: "section",
              }}
              data-shadow="y"
            >
              <SecHead
                titleSrc="Featuring"
                act1TxtSrc="Edit"
                subtxtSrc="How others see you"
                sz=""
                act1Click={{}}
                titleSz="r2"
                act1={false}
                titleClr="n700"
              />
              <ListItmCtrl
                pPTitleSrc={ancFetrTitleSrc}
                pPSubtxtSrc={ancFetrSubtxtSrc}
                listItem={ancFetrExample}
                listItemClick={ancFetrClick}
                lLAvtrSrc={ancFetrAvtrSrc}
                lLAvtrAlt={ancFetrAvtrAlt}
                lLAvtr={true}
                tTIcnClr="n200"
                pPSubtxt={true}
                lLAvtrSz="m"
                lLAvtrBdg={false}
                lLAvtrBdgClr="fs500"
                lLAvtrBdgSz="sm"
              />
              <SecPeep
                stat1Src={ancFetrStat1Src}
                stat2Src={ancFetrStat2Src}
                conCellMap={ancNewMap}
                conExampleCell={ancNewExample}
                exampleVizSrc={ancNewAvtrSrc}
                exampleVizAlt={ancNewAvtrAlt}
                exampleCellClick={ancNewClick}
                secHead={true}
                conSideFade={false}
                exampleCapt={false}
                exampleBtn={false}
                exampleCellSz="auto"
                exampleVizSz="m"
                secHeadTitleSrc="New Members"
                secHeadTitleIcn={false}
              />
            </_Builtin.Section>
            <Spacer szDep="16" size="16" />
          </_Builtin.Block>
        ) : null}
        <SecHead
          act1Click={mbrAddClick}
          titleSrc="Members"
          sz="xl"
          titleSz="h4"
          act1TxtSrc="Add"
          act1IcnSrc="Add"
          act1Txt={false}
          act1Icn={true}
          secHead={false}
        />
        <AcrdSec
          secClick={adminSecClick}
          secSubMap={adminSecSubMap}
          exampleSecSub={false}
          secIcn="admin"
          secName="Admin"
        />
        <ListItmCtrl
          pPTitleSrc={adminTitleSrc}
          pPSubtxtSrc={adminSubtxtSrc}
          listItem={adminExample}
          listItemClick={adminClick}
          lLAvtrSrc={adminAvtrSrc}
          lLAvtrAlt={adminAvtrAlt}
          lLAvtr={true}
          tTIcnClr="n200"
          pPSubtxt={false}
          lLAvtrSz="sm"
          lLAvtrBdg={true}
          lLAvtrBdgClr="fs500"
          lLAvtrBdgSz="sm"
        />
        <AcrdSec
          secName={mbrSecName}
          secIcn={mbrSecIcn}
          secClick={mbrSecClick}
          secSubMap={mbrSecSubMap}
          exampleSecSub={false}
        />
        <ListItmCtrl
          pPTitleSrc={mbrTitleSrc}
          pPSubtxtSrc={mbrSubtxtSrc}
          listItem={mbrExample}
          primeClick={mbrClick}
          trailClick={mbrMoreClick}
          lLAvtrSrc={mbrAvtrSrc}
          lLAvtrAlt={mbrAvtrAlt}
          lLAvtr={true}
          tTIcn={true}
          tTIcnClr="n200"
          lLAvtrSz="sm"
          lLAvtrBdg={true}
          lLAvtrBdgSz="sm"
          pPSubtxt={false}
        />
      </_Builtin.Block>
      <Bbc bbc={false} />
    </_Component>
  ) : null;
}
