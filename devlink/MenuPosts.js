"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { MenuItem } from "./MenuItem";
import * as _utils from "./utils";
import _styles from "./MenuPosts.module.css";

export function MenuPosts({
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
  copyText = false,
  copyLink = false,
  share = false,
  pin = false,
  bookmark = false,
  comment = false,
  edit = false,
  reportClick = {},
  feedbackClick = {},
  removeClick = {},
  noInterestClick = {},
  blockClick = {},
  muteClick = {},
  copyTextClick = {},
  copyLinkClick = {},
  shareClick = {},
  pinClick = {},
  bookmarkClick = {},
  commentClick = {},
  editClick = {},
}) {
  return menu ? (
    <_Component
      className={_utils.cx(_styles, "menu_wrap")}
      tag="nav"
      mini={mini}
      popover=""
      anchor={anchorId}
      data-bs="xs"
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
        tValueSrc="no-interest"
        lIcnSrc="no_interest"
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
        menuItm={copyText}
        menuItmClick={copyTextClick}
        lIcn={true}
        lIcnSrc="copy"
        pTitleSrc="Copy Text"
        tValueSrc="copy-text"
      />
      <MenuItem
        menuItm={copyLink}
        menuItmClick={copyLinkClick}
        lIcn={true}
        lIcnSrc="link"
        pTitleSrc="Copy Link"
        tValueSrc="copy-link"
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
        menuItm={pin}
        menuItmClick={pinClick}
        lIcn={true}
        lIcnSrc="pin"
        pTitleSrc="Pin to Top"
        tValueSrc="pin"
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
        menuItm={edit}
        menuItmClick={editClick}
        lIcn={true}
        lIcnSrc="edit"
        pTitleSrc="Edit"
        tValueSrc="edit"
      />
    </_Component>
  ) : null;
}
