"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { MenuItem } from "./MenuItem";
import * as _utils from "./utils";
import _styles from "./MenuActions.module.css";

export function MenuActions({
  as: _Component = _Builtin.Block,
  menu = true,
  mini,
  popId,
  anchorId,
  report = false,
  feedback = false,
  remove = false,
  noInterest = false,
  block = false,
  mute = false,
  archive = false,
  reorder = false,
  copy = false,
  move = false,
  print = false,
  share = false,
  assign = false,
  bookmark = false,
  comment = false,
  call = false,
  message = false,
  connect = false,
  add = false,
  search = false,
  reportClick = {},
  feedbackClick = {},
  removeClick = {},
  noInterestClick = {},
  blockClick = {},
  muteClick = {},
  archiveClick = {},
  reorderClick = {},
  copyClick = {},
  moveClick = {},
  printClick = {},
  shareClick = {},
  assignClick = {},
  bookmarkClick = {},
  commentClick = {},
  callClick = {},
  messageClick = {},
  connectClick = {},
  addClick = {},
  searchClick = {},
}) {
  return menu ? (
    <_Component
      className={_utils.cx(_styles, "menu_wrap")}
      tag="nav"
      data-mini={mini}
      data-bs="xs"
      popover=""
      anchor={anchorId}
      id={popId}
    >
      <MenuItem
        menuItm={report}
        menuItmClick={reportClick}
        lIcn={true}
        lIcnSrc="report"
        pTitleSrc="Report"
        tValueSrc="report"
      />
      <MenuItem
        menuItm={feedback}
        menuItmClick={feedbackClick}
        lIcn={true}
        lIcnSrc="bug"
        pTitleSrc="Feedback"
        tValueSrc="feedback"
      />
      <MenuItem
        menuItm={remove}
        menuItmClick={removeClick}
        lIcn={true}
        lIcnSrc="delete"
        pTitleSrc="Delete"
        tValueSrc="delete"
      />
      <MenuItem
        menuItm={noInterest}
        menuItmClick={noInterestClick}
        lIcn={true}
        pTitleSrc="No Interest"
        lIcnSrc="no_interest"
        tValueSrc="no-interest"
      />
      <MenuItem
        menuItm={block}
        menuItmClick={blockClick}
        lIcn={true}
        lIcnSrc="block"
        pTitleSrc="Block"
        tValueSrc="block"
      />
      <MenuItem
        menuItm={mute}
        menuItmClick={muteClick}
        lIcn={true}
        lIcnSrc="block"
        pTitleSrc="Mute"
        tValueSrc="mute"
      />
      <MenuItem
        menuItm={archive}
        menuItmClick={archiveClick}
        lIcn={true}
        lIcnSrc="archive"
        pTitleSrc="Archive"
        tValueSrc="archive"
      />
      <MenuItem
        menuItm={reorder}
        menuItmClick={reorderClick}
        lIcn={true}
        lIcnSrc="reorder"
        pTitleSrc="Reorder"
        tValueSrc="reorder"
      />
      <MenuItem
        menuItm={copy}
        menuItmClick={copyClick}
        lIcn={true}
        lIcnSrc="copy"
        pTitleSrc="Copy"
        tValueSrc="copy"
      />
      <MenuItem
        menuItm={move}
        menuItmClick={moveClick}
        lIcn={true}
        lIcnSrc="move"
        pTitleSrc="Move"
        tValueSrc="move"
      />
      <MenuItem
        menuItm={print}
        menuItmClick={printClick}
        lIcn={true}
        lIcnSrc="print"
        pTitleSrc="Print"
        tValueSrc="print"
      />
      <MenuItem
        menuItm={share}
        menuItmClick={shareClick}
        lIcn={true}
        lIcnSrc="share"
        pTitleSrc="Share"
        tValueSrc="share"
      />
      <MenuItem
        menuItm={assign}
        menuItmClick={assignClick}
        lIcn={true}
        lIcnSrc="assign"
        pTitleSrc="Assign"
        tValueSrc="assign"
      />
      <MenuItem
        menuItm={bookmark}
        menuItmClick={bookmarkClick}
        lIcn={true}
        lIcnSrc="bookmark"
        pTitleSrc="Bookmark"
        tValueSrc="bookmark"
      />
      <MenuItem
        menuItm={comment}
        menuItmClick={commentClick}
        lIcn={true}
        lIcnSrc="chat"
        pTitleSrc="Comment"
        tValueSrc="comment"
      />
      <MenuItem
        menuItm={call}
        menuItmClick={callClick}
        lIcn={true}
        lIcnSrc="telephone"
        pTitleSrc="Call"
        tValueSrc="call"
      />
      <MenuItem
        menuItm={message}
        menuItmClick={messageClick}
        lIcn={true}
        lIcnSrc="chat_convo"
        pTitleSrc="Message"
        tValueSrc="message"
      />
      <MenuItem
        menuItm={connect}
        menuItmClick={connectClick}
        lIcn={true}
        pTitleSrc="Connect"
        tValueSrc="connect"
        lIcnSrc="follow"
      />
      <MenuItem
        menuItm={add}
        menuItmClick={addClick}
        lIcn={true}
        lIcnSrc="addcirc"
        pTitleSrc="Add"
        tValueSrc="add"
      />
      <MenuItem
        menuItm={search}
        menuItmClick={searchClick}
        lIcn={true}
        lIcnSrc="search"
        pTitleSrc="Search"
        tValueSrc="search"
      />
    </_Component>
  ) : null;
}
