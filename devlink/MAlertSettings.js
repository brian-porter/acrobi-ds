"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ListItmContent } from "./ListItmContent";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MAlertSettings.module.css";

export function MAlertSettings({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  muteValue = "Off",
  muteClick = {},
  notifyAllClick = {},
  notifyMntClick = {},
  notifyNoneClick = {},
  hereTglClick = {},
  mntToglClick = {},
  hlightToglClick = {},
  mbrHideToglClick = {},
  muteEventToglClick = {},
  dmToglClick = {},
  pushToglClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "collection-alert-set")}
      tag="div"
    >
      <SecHead
        act1Click={cancelClick}
        titleSrc="Alert Settings"
        subtxt={true}
        subtxtSrc="Message notifications and communication activity for all posts inside of the {GroupName} group."
        subtxtSz="r4"
        titleSz="h4"
        sz="xl"
      />
      <_Builtin.Section
        className={_utils.cx(_styles, "sec-container-pad")}
        grid={{
          type: "section",
        }}
        tag="section"
        data-shadow="y"
      >
        <_Builtin.List
          className={_utils.cx(_styles, "list_wrap")}
          tag="ul"
          unstyled={true}
        >
          <ListItmContent
            tActLbl1TxtSrc={muteValue}
            listItmClick={muteClick}
            lIcnL={true}
            lIcnSrc="Block"
            pTitleSrc="Mute"
            tAct={true}
            tActLbl1Icn={true}
            tTDiv="n"
            pPDiv="n"
            lIcnSz="m"
            lIcnClr="fd500"
            tActLbl2={false}
            tActLbl1Txt={true}
            tActLbl1Clr="n700"
            tActLbl1IcnSrc="Nav_right"
            tActLbl1Sz="r2"
            pTitleSz="r1"
          />
        </_Builtin.List>
      </_Builtin.Section>
      <Spacer size="16" />
      <_Builtin.Section
        className={_utils.cx(_styles, "sec-container-pad")}
        tag="section"
        grid={{
          type: "section",
        }}
        data-shadow="y"
      >
        <SecHead
          titleSrc="Notify for"
          sz="l"
          act1TxtSrc="All"
          act1Click={{}}
          act1={false}
          titleSz="h5"
        />
        <_Builtin.List
          className={_utils.cx(_styles, "list_wrap")}
          tag="ul"
          unstyled={true}
        >
          <ListItmContent
            listItmClick={notifyAllClick}
            pSubtxt1={true}
            tTRdio={true}
            pTitleSrc="All Messages"
            pSubtxt1Src="Every new message gives a notification"
            lIcnL={true}
            lIcnSz="m"
            lIcnSrc="Alarm"
            lIcnClr="yellow-700"
          />
          <ListItmContent
            listItmClick={notifyMntClick}
            pSubtxt1={true}
            tTRdio={true}
            pTitleSrc="Only @mentions"
            pSubtxt1Src="Just when your @handle is used"
            tTRdioIcn="circ_on"
            tTRdioClr="p500"
            lIcnL={true}
            lIcnSz="m"
            lIcnSrc="At"
            lIcnClr="purple-500"
          />
          <ListItmContent
            listItmClick={notifyNoneClick}
            pSubtxt1={true}
            tTRdio={true}
            pTitleSrc="Nothing"
            pSubtxt1Src="No notiications will be sent to you"
            lIcnL={true}
            lIcnSz="m"
            lIcnSrc="Clearcirc"
            lIcnClr="grey-700"
          />
        </_Builtin.List>
      </_Builtin.Section>
      <Spacer size="16" />
      <_Builtin.Section
        className={_utils.cx(_styles, "sec-container-pad")}
        tag="section"
        grid={{
          type: "section",
        }}
        data-shadow="y"
      >
        <SecHead
          titleSrc="Permissions"
          sz="l"
          act1TxtSrc="All"
          act1Click={{}}
          act1={false}
          titleSz="h5"
        />
        <_Builtin.List
          className={_utils.cx(_styles, "list_wrap")}
          tag="ul"
          unstyled={true}
        >
          <ListItmContent
            tToglClick={hereTglClick}
            lImg={false}
            lAvtr={false}
            lAdptIcn={false}
            tTogl={true}
            listItm={true}
            lIcnClr="p500"
            lIcnSz="s"
            lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
            lImgAlt="__wf_reserved_inherit"
            lImgSz="l"
            lAvtrSz="m"
            lAdptIcnSrc="Default"
            lAdptSz="m"
            lAdptBgClr="n500"
            lLDiv=""
            pTitleSz="r2"
            pTitleClr="n900"
            pSubtxt2Src="Subtext2"
            pSubtxt1Sz="r3"
            pSubtxt2Sz="r3"
            pSubtxt1Clr="n700"
            pSubtxt2Clr="n700"
            pPDiv="y"
            tActLbl1Txt={false}
            tTIcnSrc="nav_right"
            tToglValue="here"
            pTitleSrc="Silence @everyone & @here"
          />
          <ListItmContent
            tToglClick={mntToglClick}
            lImg={false}
            lAvtr={false}
            lAdptIcn={false}
            tTogl={true}
            listItm={true}
            lIcnClr="p500"
            lIcnSz="s"
            lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
            lImgAlt="__wf_reserved_inherit"
            lImgSz="l"
            lAvtrSz="m"
            lAdptIcnSrc="Default"
            lAdptSz="m"
            lAdptBgClr="n500"
            lLDiv=""
            pTitleSz="r2"
            pTitleClr="n900"
            pSubtxt2Src="Subtext2"
            pSubtxt1Sz="r3"
            pSubtxt2Sz="r3"
            pSubtxt1Clr="n700"
            pSubtxt2Clr="n700"
            pPDiv="y"
            tActLbl1Txt={false}
            tTIcnSrc="nav_right"
            tToglValue="mention"
            pTitleSrc="Silence all role @mentions"
          />
          <ListItmContent
            tToglClick={hlightToglClick}
            lImg={false}
            lAvtr={false}
            lAdptIcn={false}
            tTogl={true}
            listItm={true}
            lIcnClr="p500"
            lIcnSz="s"
            lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
            lImgAlt="__wf_reserved_inherit"
            lImgSz="l"
            lAvtrSz="m"
            lAdptIcnSrc="Default"
            lAdptSz="m"
            lAdptBgClr="n500"
            lLDiv=""
            pTitleSz="r2"
            pTitleClr="n900"
            pSubtxt2Src="Subtext2"
            pSubtxt1Sz="r3"
            pSubtxt2Sz="r3"
            pSubtxt1Clr="n700"
            pSubtxt2Clr="n700"
            pPDiv="y"
            tActLbl1Txt={false}
            tTIcnSrc="nav_right"
            tToglValue="highlight"
            pTitleSrc="Silence highlights"
          />
          <ListItmContent
            tToglClick={mbrHideToglClick}
            lImg={false}
            lAvtr={false}
            lAdptIcn={false}
            tTogl={true}
            listItm={true}
            lIcnClr="p500"
            lIcnSz="s"
            lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
            lImgAlt="__wf_reserved_inherit"
            lImgSz="l"
            lAvtrSz="m"
            lAdptIcnSrc="Default"
            lAdptSz="m"
            lAdptBgClr="n500"
            lLDiv=""
            pTitleSz="r2"
            pTitleClr="n900"
            pSubtxt2Src="Subtext2"
            pSubtxt1Sz="r3"
            pSubtxt2Sz="r3"
            pSubtxt1Clr="n700"
            pSubtxt2Clr="n700"
            pPDiv="y"
            tActLbl1Txt={false}
            tTIcnSrc="nav_right"
            tToglValue="mute"
            pTitleSrc="Hide muted members"
          />
          <ListItmContent
            tToglClick={muteEventToglClick}
            lImg={false}
            lAvtr={false}
            lAdptIcn={false}
            tTogl={true}
            listItm={true}
            lIcnClr="p500"
            lIcnSz="s"
            lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
            lImgAlt="__wf_reserved_inherit"
            lImgSz="l"
            lAvtrSz="m"
            lAdptIcnSrc="Default"
            lAdptSz="m"
            lAdptBgClr="n500"
            lLDiv=""
            pTitleSz="r2"
            pTitleClr="n900"
            pSubtxt2Src="Subtext2"
            pSubtxt1Sz="r3"
            pSubtxt2Sz="r3"
            pSubtxt1Clr="n700"
            pSubtxt2Clr="n700"
            pPDiv="y"
            tActLbl1Txt={false}
            tTIcnSrc="nav_right"
            tToglValue="MuteEvent"
            pTitleSrc="Mute new events"
          />
          <ListItmContent
            tToglClick={dmToglClick}
            lImg={false}
            lAvtr={false}
            lAdptIcn={false}
            tTogl={true}
            listItm={true}
            lIcnClr="p500"
            lIcnSz="s"
            lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
            lImgAlt="__wf_reserved_inherit"
            lImgSz="l"
            lAvtrSz="m"
            lAdptIcnSrc="Default"
            lAdptSz="m"
            lAdptBgClr="n500"
            lLDiv=""
            pTitleSz="r2"
            pTitleClr="n900"
            pSubtxt2Src="Subtext2"
            pSubtxt1Sz="r3"
            pSubtxt2Sz="r3"
            pSubtxt1Clr="n700"
            pSubtxt2Clr="n700"
            pPDiv="y"
            tActLbl1Txt={false}
            tTIcnSrc="nav_right"
            tToglValue="DM"
            pTitleSrc="Allow direct messages"
          />
          <ListItmContent
            tToglClick={pushToglClick}
            lImg={false}
            lAvtr={false}
            lAdptIcn={false}
            tTogl={true}
            listItm={true}
            lIcnClr="p500"
            lIcnSz="s"
            lImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
            lImgAlt="__wf_reserved_inherit"
            lImgSz="l"
            lAvtrSz="m"
            lAdptIcnSrc="Default"
            lAdptSz="m"
            lAdptBgClr="n500"
            lLDiv=""
            pTitleSz="r2"
            pTitleClr="n900"
            pSubtxt2Src="Subtext2"
            pSubtxt1Sz="r3"
            pSubtxt2Sz="r3"
            pSubtxt1Clr="n700"
            pSubtxt2Clr="n700"
            pPDiv="y"
            tActLbl1Txt={false}
            tTIcnSrc="nav_right"
            tToglValue="push"
            pTitleSrc="Mobile push notifications"
          />
        </_Builtin.List>
      </_Builtin.Section>
      <Spacer szDep="80" size="80" />
    </_Component>
  );
}
