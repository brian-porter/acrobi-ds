"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ListItmCtrl } from "./ListItmCtrl";
import { Message } from "./Message";
import { Spacer } from "./Spacer";
import { ButtonPanel } from "./ButtonPanel";
import * as _utils from "./utils";
import _styles from "./MBlock.module.css";

export function MBlock({
  as: _Component = _Builtin.Block,
  block = true,
  blockCancelClick = {},
  blockAvtr = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  blockAvtrAlt = "__wf_reserved_inherit",
  blockTitle = "FName LName",
  blockSubtxt = "@handle",
  blockDoClick = {},
  unBlock = false,
  unBlockCancelClick = {},
  unBlockAvtr = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  unBlockAvtrAlt = "__wf_reserved_inherit",
  unBlockTitle = "FName LName",
  unBlockSubtxt = "@handle",
  unBlockDoClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-block")}
      tag="section"
      id="Block"
    >
      {block ? (
        <_Builtin.Block className={_utils.cx(_styles, "block-wrap")} tag="div">
          <SecHead
            act1Click={blockCancelClick}
            sz="xl"
            titleSz="h4"
            titleSrc="Block"
          />
          <ListItmCtrl
            pPTitleSrc={blockTitle}
            pPSubtxtSrc={blockSubtxt}
            lLAvtrSrc={blockAvtr}
            lLAvtrAlt={blockAvtrAlt}
            lLAvtr={true}
            lLImg={false}
            lLAvtrSz="l"
            lLAdptSz="l"
            lLImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
          />
          <Message
            bodySrc="Once you block someone, that person can no longer see things you post, tag you, invite you to events or groups, start a conversation with you, or add you as a friend. Note: People you block can still see and comment on stuff you share in groups and the community."
            titleSrc="Are you sure you want to block?"
            icnSrc="Peep_block"
            icnClr="fd500"
          />
          <Spacer szDep="48" size="48" />
          <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
            <ButtonPanel
              btn1Click={blockDoClick}
              btn2={false}
              btn3={false}
              btn1Styl="df"
              btn1TxtSrc="Block"
            />
            <Spacer size="16" />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {unBlock ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "unblock-wrap")}
          tag="div"
        >
          <SecHead
            act1Click={unBlockCancelClick}
            sz="xl"
            titleSz="h4"
            titleSrc="UnBlock"
          />
          <ListItmCtrl
            pPTitleSrc={unBlockTitle}
            pPSubtxtSrc={unBlockSubtxt}
            lLAvtrSrc={unBlockAvtr}
            lLAvtrAlt={unBlockAvtrAlt}
            lLAvtr={true}
            lLImg={false}
            lLAvtrSz="l"
            lLAdptSz="l"
            lLImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
          />
          <Message
            bodySrc="By unblock someone, that person can see things you post, tag you, invite you to events or groups, start a conversation with you, or add you as a friend."
            titleSrc="Are you sure you want to UNblock?"
            icnSrc="Peep_block"
            icnClr="fd500"
          />
          <Spacer szDep="48" size="48" />
          <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
            <ButtonPanel
              btn1Click={unBlockDoClick}
              btn2={false}
              btn3={false}
              btn1Styl="df"
              btn1TxtSrc="UnBlock"
            />
            <Spacer size="16" />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
