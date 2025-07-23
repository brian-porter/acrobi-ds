"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./MRoomDetail.module.css";

export function MRoomDetail({
  as: _Component = _Builtin.Block,
  rmDetail = true,
  head = true,
  hHeadGttrBdgPin = false,
  hHeadGttrBdgAlarm = false,
  hHeadGttrBdgBkmrk = false,
  hHeadIcn = true,
  hHeadIcnSrc = "Default",
  hHeadAvtr = false,
  hHeadAvtr2 = false,
  hHeadAvtr3 = false,
  hHeadAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  hHeadAvtrAlt = "__wf_reserved_inherit",
  hHeadAvtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  hHeadAvtr2Alt = "__wf_reserved_inherit",
  hHeadAvtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  hHeadAvtr3Alt = "__wf_reserved_inherit",
  hHeadTitleSrc = "RoomName",
  hHeadSubtxtSrc = "xx members",
  hHeadMoreClick = {},
  msgListMap,
  mediaListMap,
  mediaViewMap,
  atchListMap,
  atchViewMap,
}) {
  return rmDetail ? (
    <_Component className={_utils.cx(_styles, "room_detail")} tag="div">
      {head ? (
        <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
          <SecHead
            act1Click={hHeadMoreClick}
            titleSrc={hHeadTitleSrc}
            gttrBdgPin={hHeadGttrBdgPin}
            gttrBdgAlarm={hHeadGttrBdgAlarm}
            gttrBdgBkmrk={hHeadGttrBdgBkmrk}
            subtxtSrc={hHeadSubtxtSrc}
            titleIcn={hHeadIcn}
            titleAvtr={hHeadAvtr}
            titleAvtrSrc={hHeadAvtrSrc}
            titleAvtrAlt={hHeadAvtrAlt}
            titleAvtr2={hHeadAvtr2}
            titleAvtr3={hHeadAvtr3}
            titleAvtr2Src={hHeadAvtr2Src}
            titleAvtr2Alt={hHeadAvtr2Alt}
            titleAvtr3Src={hHeadAvtr3Src}
            titleAvtr3Alt={hHeadAvtr3Alt}
            sz="l"
            titleSz="r1b"
            act1TxtSrc="More"
            act1IcnSrc="Moreh"
            act1Txt={false}
            act1Icn={true}
            act2={false}
            act2Txt={true}
            act1Clr="n500"
            act1={true}
            act1Styl="nt"
            subtxt={true}
            act2TxtSrc="Gallery"
            secHead={true}
            titleClick={{}}
            titleIcnSrc="Default"
            titleIcnSz="l"
            act2IcnSrc="gallery"
            act2Styl="ft"
            act2IcnLoc="r"
            act2Click={{}}
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "tabs-wrap")} tag="div">
        <_Builtin.TabsWrapper
          className={_utils.cx(_styles, "tabs")}
          data-duration-in="300"
          data-duration-out="100"
          tab-underline=""
          current="messaging"
          easing="ease-in-out"
          fadeIn={300}
          fadeOut={100}
        >
          <_Builtin.TabsMenu
            className={_utils.cx(_styles, "tab-menu", "u-side-scroll")}
            tag="div"
          >
            <_Builtin.TabsLink
              className={_utils.cx(_styles, "tab-link")}
              data-w-tab="messaging"
              block="inline"
            >
              <Label
                txtSrc="Messaging"
                icnSrc="chat_convo"
                txt={true}
                icn={true}
                icnLoc="l"
              />
            </_Builtin.TabsLink>
            <_Builtin.TabsLink
              className={_utils.cx(_styles, "tab-link")}
              data-w-tab="gallery"
              block="inline"
            >
              <Label txtSrc="Gallery" icnSrc="gal" txt={true} icn={true} />
            </_Builtin.TabsLink>
            <_Builtin.TabsLink
              className={_utils.cx(_styles, "tab-link")}
              data-w-tab="attached"
              block="inline"
            >
              <Label txtSrc="Attached" icnSrc="attach" txt={true} icn={true} />
            </_Builtin.TabsLink>
          </_Builtin.TabsMenu>
          <_Builtin.TabsContent
            className={_utils.cx(_styles, "tab-content-room")}
            tag="div"
          >
            <_Builtin.TabsPane
              className={_utils.cx(_styles, "tab-detail")}
              tag="div"
              data-w-tab="messaging"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "a-tab-body")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "msg-list")}
                  tag="div"
                >
                  {msgListMap ?? (
                    <_Builtin.HtmlEmbed value="%3C!--%20Map%20Message%20List%20Here%20--%3E" />
                  )}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.TabsPane>
            <_Builtin.TabsPane
              className={_utils.cx(_styles, "tab-detail")}
              tag="div"
              data-w-tab="gallery"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "a-tab-body")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "media-list")}
                  tag="div"
                >
                  {mediaListMap ?? (
                    <_Builtin.HtmlEmbed value="%3C!--%20Map%20Media%20List%20Here%20--%3E" />
                  )}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "media-view")}
                  tag="div"
                >
                  {mediaViewMap ?? (
                    <_Builtin.HtmlEmbed value="%3C!--%20Map%20Media%20View%20Here%20--%3E" />
                  )}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "a-bbc-btm-spacer")}
                  tag="div"
                />
              </_Builtin.Block>
            </_Builtin.TabsPane>
            <_Builtin.TabsPane
              className={_utils.cx(_styles, "tab-detail")}
              tag="div"
              data-w-tab="attached"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "a-tab-body")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "atch-list")}
                  tag="div"
                >
                  {atchListMap ?? (
                    <_Builtin.HtmlEmbed value="%3C!--%20Map%20Attachments%20List%20Here%20--%3E" />
                  )}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "atch-view")}
                  tag="div"
                >
                  {atchViewMap ?? (
                    <_Builtin.HtmlEmbed value="%3C!--%20Map%20Attachment%20View%20Here%20--%3E" />
                  )}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "a-bbc-btm-spacer")}
                  tag="div"
                />
              </_Builtin.Block>
            </_Builtin.TabsPane>
          </_Builtin.TabsContent>
        </_Builtin.TabsWrapper>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
