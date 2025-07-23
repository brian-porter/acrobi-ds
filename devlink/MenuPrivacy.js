"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { MenuItem } from "./MenuItem";
import * as _utils from "./utils";
import _styles from "./MenuPrivacy.module.css";

export function MenuPrivacy({
  as: _Component = _Builtin.Block,
  menu = true,
  mini,
  popId,
  anchorId,
  broadcast = false,
  broadcastOn = false,
  publicly = false,
  publiclyOn = false,
  privately = false,
  privatelyOn = false,
  confidential = false,
  confidentialOn = false,
  broadcastClick = {},
  publiclyClick = {},
  privatelyClick = {},
  confidentialClick = {},
}) {
  return menu ? (
    <_Component
      className={_utils.cx(_styles, "menu_wrap")}
      tag="nav"
      data-mini={mini}
      popover=""
      anchor={anchorId}
      data-bs="xs"
      id={popId}
    >
      <SecHead titleSrc="Privacy" sz="xl" act1={false} titleSz="h4" />
      <MenuItem
        menuItm={broadcast}
        menuItmClick={broadcastClick}
        tSelected={broadcastOn}
        lIcn={true}
        pSubtext={true}
        pTitleSrc="Broadcast"
        lIcnSrc="broadcast"
        pSubtxtSrc="For public consumption"
        tValueSrc="broadcast"
      />
      <MenuItem
        menuItm={publicly}
        menuItmClick={publiclyClick}
        tSelected={publiclyOn}
        lIcn={true}
        pSubtext={true}
        pTitleSrc="Public"
        lIcnSrc="public"
        pSubtxtSrc="My network can see, share, & copy"
        tValueSrc="public"
      />
      <MenuItem
        menuItm={privately}
        menuItmClick={privatelyClick}
        tSelected={privatelyOn}
        lIcn={true}
        pSubtext={true}
        pTitleSrc="Private"
        lIcnSrc="private"
        pSubtxtSrc="Visible only to those I share with"
        tValueSrc="private"
      />
      <MenuItem
        menuItm={confidential}
        menuItmClick={confidentialClick}
        tSelected={confidentialOn}
        lIcn={true}
        pSubtext={true}
        pTitleSrc="Confidential"
        lIcnSrc="none"
        pSubtxtSrc="No copying or sharing by others"
        tValueSrc="confidential"
      />
    </_Component>
  ) : null;
}
