"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { BtnBarSs } from "./BtnBarSs";
import { Spacer } from "./Spacer";
import { BarSs } from "./BarSs";
import { AcrdSec } from "./AcrdSec";
import { ListItmCtrl } from "./ListItmCtrl";
import { Bbc } from "./Bbc";
import * as _utils from "./utils";
import _styles from "./MRoomList.module.css";

export function MRoomList({
  as: _Component = _Builtin.Block,
  rmList = true,
  bbc = true,
  head = true,
  hHeadGttrBdgPin = false,
  hHeadGttrBdgAlarm = false,
  hHeadGttrBdgBkmrk = false,
  hHeadTitleSrc = "GroupName",
  hHeadSubtxtSrc = "@handle",
  hHeadNameClick = {},
  hHeadMoreClick = {},
  feature = false,
  rmAdd = false,
  rmAddClick = {},
  featureMap,
  exampleFeature = true,
  exFeatureImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exFeatureImgAlt = "__wf_reserved_inherit",
  exFeatureImgTitleSrc = "ObjectName",
  exFeatureClick = {},
  rmSecIcn = "default",
  rmSecName = "SectionName",
  rmSecClick = {},
  rmItmMap,
  exampleRmItm = true,
  exRmItmGttrBdgPin = false,
  exRmItmGttrBdgAlarm = false,
  exRmItmGttrBdgBkmrk = false,
  exRmItmClick = {},
  exRmItmIcnSrc = "Default",
  exRmItmTitleSrc = "RoomName",
  exRmItmSubtxtSrc = "description of the room",
  exRmItmBdg = true,
  exRmItmBdgTxtSrc = "3",
  dmAdd = true,
  dmSecClick = {},
  dmAddClick = {},
  exampleDmItm = true,
  exDmItmClick = {},
  exDmItmAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  exDmItmAvtrAlt = "__wf_reserved_inherit",
  exDmItmAvtr2 = true,
  exDmItmAvtr3 = true,
  exDmItmAvtr4 = false,
  exDmItmAvtr5 = false,
  exDmItmAvtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  exDmItmAvtr2Alt = "__wf_reserved_inherit",
  exDmItmAvtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  exDmItmAvtr3Alt = "__wf_reserved_inherit",
  exDmItmAvtr4Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  exDmItmAvtr4Alt = "__wf_reserved_inherit",
  exDmItmAvtr5Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  exDmItmAvtr5Alt = "__wf_reserved_inherit",
  exDmItmTitleSrc = "FName, FName, FName",
  exDmItmBdg = true,
  exDmItmBdgTxtSrc = "3",
  bbcNavMap,
  bbcExampleNav = true,
  bbcBtnBack = true,
  bbcBtnDo = true,
  bbcBtnBackClick = {},
  bbcBtnDoClick = {},
}) {
  return rmList ? (
    <_Component className={_utils.cx(_styles, "room_list")} tag="div">
      {head ? (
        <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
          <SecHead
            act1Click={hHeadMoreClick}
            titleSrc={hHeadTitleSrc}
            subtxtSrc={hHeadSubtxtSrc}
            gttrBdgPin={hHeadGttrBdgPin}
            gttrBdgAlarm={hHeadGttrBdgAlarm}
            gttrBdgBkmrk={hHeadGttrBdgBkmrk}
            titleClick={hHeadNameClick}
            sz="m"
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
            subtxt={true}
            act2TxtSrc=""
            act2IcnSrc=""
            secHead={true}
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <BtnBarSs btnBar={false} />
        <SecHead
          act1Click={rmAddClick}
          act1={rmAdd}
          titleSrc="Rooms"
          sz="m"
          titleSz="h4"
          act1TxtSrc="Create"
          act1IcnSrc="Add"
          act1Txt={false}
          act1Icn={true}
          act2={false}
          act2Txt={true}
          act1Clr="in"
        />
        {feature ? (
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
                titleSrc="Announcements"
                act1TxtSrc="Edit"
                subtxtSrc="How others see you"
                sz=""
                act1Click={{}}
                titleSz="r2"
                act1={false}
                titleClr="n700"
              />
              <BarSs barMap={featureMap} slotId="image" />
              <Spacer szDep="8" size="8" />
            </_Builtin.Section>
            <Spacer szDep="16" size="16" />
          </_Builtin.Block>
        ) : null}
        <AcrdSec
          secName={rmSecName}
          secIcn={rmSecIcn}
          secClick={rmSecClick}
          secSubMap={rmItmMap}
          exampleSecSub={false}
        />
        <ListItmCtrl
          pPTitleSrc={exRmItmTitleSrc}
          pPSubtxtSrc={exRmItmSubtxtSrc}
          tTBdg={exRmItmBdg}
          lLIcnSrc={exRmItmIcnSrc}
          listItem={exampleRmItm}
          listItemClick={exRmItmClick}
          tTBdgTxtSrc={exRmItmBdgTxtSrc}
          gttrBdgPin={exRmItmGttrBdgPin}
          gttrBdgBkmrk={exRmItmGttrBdgBkmrk}
          gttrBdgAlarm={exRmItmGttrBdgAlarm}
          lLIcn={true}
          lLIcnSz="l"
          lLIcnClr="n500"
          gttrBdg={true}
          tTBdgClr="red"
        />
        <Spacer szDep="24" size="24" />
        <SecHead
          act1Click={dmAddClick}
          act1={dmAdd}
          titleClick={dmSecClick}
          titleSrc="Direct Messages"
          sz="m"
          titleSz="h4"
          act1TxtSrc="Add"
          act1IcnSrc="Add"
          act1Txt={false}
          act1Icn={true}
          act2={false}
          act2Txt={true}
          act2TxtSrc="New DM"
          act1Clr="in"
          act1IcnLoc="r"
          titleIcnSrc="chat_convo"
          titleIcnClr="n700"
          titleIcnSz="m"
        />
        <ListItmCtrl
          pPTitleSrc={exDmItmTitleSrc}
          tTBdg={exDmItmBdg}
          lLAvtr2={exDmItmAvtr2}
          lLAvtr3={exDmItmAvtr3}
          listItemClick={exDmItmClick}
          lLAvtrSrc={exDmItmAvtrSrc}
          lLAvtrAlt={exDmItmAvtrAlt}
          lLAvtr2Src={exDmItmAvtr2Src}
          lLAvtr2Alt={exDmItmAvtr2Alt}
          lLAvtr3Src={exDmItmAvtr3Src}
          lLAvtr3Alt={exDmItmAvtr3Alt}
          lLAvtr4={exDmItmAvtr4}
          lLAvtr5={exDmItmAvtr5}
          lLAvtr4Src={exDmItmAvtr4Src}
          lLAvtr4Alt={exDmItmAvtr4Alt}
          lLAvtr5Src={exDmItmAvtr5Src}
          lLAvtr5Alt={exDmItmAvtr5Alt}
          tTBdgTxtSrc={exDmItmBdgTxtSrc}
          listItem={exampleDmItm}
          lLImg={false}
          pPSubtxtSrc="@handle"
          lLImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664e68130573df244d21d9b9_billboard-default.avif"
          lLAvtr={true}
          lLAvtrSz="s"
          pPSubtxt={false}
          tTBdgClr="red"
        />
      </_Builtin.Block>
      <Bbc bbc={bbc} navMap={bbcNavMap} />
    </_Component>
  ) : null;
}
