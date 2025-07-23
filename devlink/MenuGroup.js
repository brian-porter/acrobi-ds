"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { MenuItem } from "./MenuItem";
import * as _utils from "./utils";
import _styles from "./MenuGroup.module.css";

export function MenuGroup({
  as: _Component = _Builtin.Block,
  menu = true,
  mini,
  popId,
  anchorId,
  report = false,
  feedback = false,
  remove = false,
  removeSrc = "Delete",
  removeG = false,
  leave = false,
  noInterest = false,
  block = false,
  mute = false,
  copyTxt = false,
  copyLink = false,
  share = false,
  feature = false,
  pin = false,
  alert = false,
  bkmrk = false,
  comment = false,
  search = false,
  edit = false,
  reportClick = {},
  feedbackClick = {},
  removeClick = {},
  removeGClick = {},
  leaveClick = {},
  noInterestClick = {},
  blockClick = {},
  muteClick = {},
  copyTxtClick = {},
  copyLinkClick = {},
  shareClick = {},
  featureClick = {},
  pinClick = {},
  alertClick = {},
  bkmrkClick = {},
  commentClick = {},
  searchClick = {},
  editClick = {},
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
        pTitleSrc={removeSrc}
        lIcn={true}
        lIcnSrc="delete"
        tValueSrc="delete"
      />
      <MenuItem
        menuItm={removeG}
        menuItmClick={removeGClick}
        lIcn={true}
        lIcnSrc="peep_remove"
        pTitleSrc="Remove from Group"
        tValueSrc="remove"
      />
      <MenuItem
        menuItm={leave}
        menuItmClick={leaveClick}
        lIcn={true}
        lIcnSrc="exit"
        pTitleSrc="Leave Group"
        tValueSrc="leave"
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
        menuItm={copyTxt}
        menuItmClick={copyTxtClick}
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
        menuItm={feature}
        menuItmClick={featureClick}
        lIcn={true}
        lIcnSrc="pin"
        pTitleSrc="Feature"
        tValueSrc="feature"
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
        menuItm={alert}
        menuItmClick={alertClick}
        lIcn={true}
        lIcnSrc="alarm"
        pTitleSrc="Alerts"
        tValueSrc="alert"
      />
      <MenuItem
        menuItm={bkmrk}
        menuItmClick={bkmrkClick}
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
        menuItm={search}
        menuItmClick={searchClick}
        lIcn={true}
        lIcnSrc="search"
        pTitleSrc="Search"
        tValueSrc="search"
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
