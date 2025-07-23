"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Cell } from "./Cell";
import { MenuItem } from "./MenuItem";
import * as _utils from "./utils";
import _styles from "./MenuMsg.module.css";

export function MenuMsg({
  as: _Component = _Builtin.Block,
  menu = true,
  mini,
  popId,
  anchorId,
  emojiBar = false,
  emojiExample = true,
  emojiMap,
  emojiSrc = "default",
  emojiSz = "l",
  emojiClick = {},
  report = false,
  feedback = false,
  remove = false,
  copyTxt = false,
  copyLink = false,
  share = false,
  pin = false,
  pinSrc = "Pin to Top",
  reply = false,
  edit = false,
  reportClick = {},
  feedbackClick = {},
  removeClick = {},
  copyTxtClick = {},
  copyLinkClick = {},
  shareClick = {},
  pinClick = {},
  replyClick = {},
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
      {emojiBar ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "bar-sidescroll")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "u-bar-ss")} tag="div">
            {emojiMap ?? (
              <Cell
                cell={emojiExample}
                cellClick={emojiClick}
                icnIcnSrc={emojiSrc}
                icnIcnSz={emojiSz}
                cellSz="m"
                captionCapStk={true}
                capStkRow1Src="Name"
                caption={false}
                cellActv={false}
                imgImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg"
                imgImgAlt="__wf_reserved_inherit"
                vizImg={false}
              />
            )}
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "side-fade")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "side-fade-l")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "side-fade-r")}
              tag="div"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
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
        pTitleSrc="Delete Message"
        tValueSrc="delete"
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
        pTitleSrc={pinSrc}
        menuItm={pin}
        menuItmClick={pinClick}
        lIcn={true}
        lIcnSrc="pin"
        tValueSrc="pin"
      />
      <MenuItem
        menuItm={reply}
        menuItmClick={replyClick}
        lIcn={true}
        lIcnSrc="reply"
        pTitleSrc="Reply"
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
