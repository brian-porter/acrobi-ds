"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { MenuItem } from "./MenuItem";
import * as _utils from "./utils";
import _styles from "./MenuAdmin.module.css";

export function MenuAdmin({
  as: _Component = _Builtin.Block,
  menu = true,
  mini,
  popId,
  anchorId,
  reportRoom = false,
  report = false,
  removeRoom = false,
  remove = false,
  reorder = false,
  assignRole = false,
  pin = false,
  announce = false,
  message = false,
  connect = false,
  assignOwn = false,
  leave = false,
  reportRoomClick = {},
  reportClick = {},
  removeRoomClick = {},
  removeClick = {},
  reorderClick = {},
  assignRoleClick = {},
  pinClick = {},
  announceClick = {},
  messageClick = {},
  connectClick = {},
  assignOwnClick = {},
  leaveClick = {},
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
      <MenuItem
        menuItm={reportRoom}
        menuItmClick={reportRoomClick}
        lIcn={true}
        pTitleSrc="Report Room"
        lIcnSrc="report"
      />
      <MenuItem
        menuItm={report}
        menuItmClick={reportClick}
        lIcn={true}
        pTitleSrc="Report Person"
        lIcnSrc="report"
      />
      <MenuItem
        menuItm={removeRoom}
        menuItmClick={removeRoomClick}
        lIcn={true}
        pTitleSrc="Delete Room"
        lIcnSrc="delete"
      />
      <MenuItem
        menuItm={remove}
        menuItmClick={removeClick}
        lIcn={true}
        pTitleSrc="Remove from Group"
        lIcnSrc="peep_remove"
      />
      <MenuItem
        menuItm={reorder}
        menuItmClick={reorderClick}
        lIcn={true}
        pTitleSrc="Reorder"
        lIcnSrc="reorder"
      />
      <MenuItem
        menuItm={assignRole}
        menuItmClick={assignRoleClick}
        lIcn={true}
        pTitleSrc="Assign Role"
        lIcnSrc="peep_role"
      />
      <MenuItem
        menuItm={pin}
        menuItmClick={pinClick}
        lIcn={true}
        pTitleSrc="Pin to Top"
        lIcnSrc="pin"
      />
      <MenuItem
        menuItm={announce}
        menuItmClick={announceClick}
        lIcn={true}
        pTitleSrc="Make Announcement"
        lIcnSrc="annouce"
      />
      <MenuItem
        menuItm={message}
        menuItmClick={messageClick}
        lIcn={true}
        pTitleSrc="Direct Message"
        lIcnSrc="chat_convo"
      />
      <MenuItem
        menuItm={connect}
        menuItmClick={connectClick}
        lIcn={true}
        lIcnSrc="follow"
        pTitleSrc="Connect"
      />
      <MenuItem
        menuItm={assignOwn}
        menuItmClick={assignOwnClick}
        lIcn={true}
        pTitleSrc="Assign Ownership"
        lIcnSrc="assign"
      />
      <MenuItem
        menuItm={leave}
        menuItmClick={leaveClick}
        lIcn={true}
        pTitleSrc="Leave Group"
        lIcnSrc="exit"
      />
    </_Component>
  ) : null;
}
