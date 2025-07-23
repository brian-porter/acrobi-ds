"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ListNotice } from "./ListNotice";
import { List } from "./List";
import { ListItmCtrl } from "./ListItmCtrl";
import { Bbc } from "./Bbc";
import * as _utils from "./utils";
import _styles from "./MMessageList.module.css";

export function MMessageList({
  as: _Component = _Builtin.Block,
  notice = true,
  noticeMsg = true,
  noticeMsgBgCl = "f500",
  noticeMsgClick = {},
  noticeMsgTxtSrc = "X new messages since {lastOpenTime}",
  msgMap,
  exampleMsg = true,
  exMsgGttrBdgPin = false,
  exMsgGttrBdgAlarm = false,
  exMsgGttrBdgBkmrk = false,
  exMsgAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  exMsgAvtrAlt = "__wf_reserved_inherit",
  exMsgName = "FName LName",
  exMsgTime = "xx",
  exMsgBody = "Message body copy goes here and will wrap at the end of the line for as mny times as it needs to display the contents of the message. Message body copy goes here and will wrap at the end of the line for as mny times as it needs to display the contents of the message.",
  exMsgClick = {},
  bbc = true,
  bbcMap,
}) {
  return (
    <_Component className={_utils.cx(_styles, "message_detail")} tag="div">
      <ListNotice
        noticeMsgBgCl={noticeMsgBgCl}
        noticeMsg={noticeMsg}
        noticeSpace={notice}
        noticeMsgClick={noticeMsgClick}
        noticeMsgTxtSrc={noticeMsgTxtSrc}
      />
      <List listItmMap={msgMap} exampleListItm={false} />
      <ListItmCtrl
        gttrBdgPin={exMsgGttrBdgPin}
        gttrBdgBkmrk={exMsgGttrBdgBkmrk}
        pPMsgBody={exMsgBody}
        listItem={exampleMsg}
        gttrBdgAlarm={exMsgGttrBdgAlarm}
        lLAvtrSrc={exMsgAvtrSrc}
        lLAvtrAlt={exMsgAvtrAlt}
        pPMsgName={exMsgName}
        pPMsgTime={exMsgTime}
        primeClick={exMsgClick}
        lLAvtr={true}
        tTActLbl1Txt={false}
        tTAct={false}
        gttrBdg={true}
        pPTitleSubtxt={false}
        pPMsg={true}
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "a-bbc-btm-spacer")}
        tag="div"
      />
      <Bbc navMap={bbcMap} bbc={bbc} />
    </_Component>
  );
}
