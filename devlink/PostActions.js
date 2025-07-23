"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./PostActions.module.css";

export function PostActions({
  as: _Component = _Builtin.Block,
  postAct = true,
  like = true,
  likeQty = false,
  likeQtySrc = "1",
  likeIcnSrc = "act_like",
  likeClick = {},
  comment = true,
  commentQty = false,
  commentQtySrc = "1",
  commentIcnSrc = "chat",
  commentClick = {},
  give = false,
  giveIcnSrc = "i_wish",
  giveClick = {},
  share = true,
  shareClick = {},
  bookmark = true,
  bookmarkIcnSrc = "act_bookmark",
  bookmarkClick = {},
}) {
  return postAct ? (
    <_Component className={_utils.cx(_styles, "post-act-bar")} tag="div">
      {like ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "post-act-item")}
          tag="div"
          {...likeClick}
        >
          <Label
            txtSrc={likeQtySrc}
            txt={likeQty}
            icnSrc={likeIcnSrc}
            lblSz="r2"
          />
        </_Builtin.Block>
      ) : null}
      {comment ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "post-act-item")}
          tag="div"
          {...commentClick}
        >
          <Label
            txtSrc={commentQtySrc}
            txt={commentQty}
            icnSrc={commentIcnSrc}
            lblSz="r2"
          />
        </_Builtin.Block>
      ) : null}
      {give ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "post-act-item")}
          tag="div"
          {...giveClick}
        >
          <Label icnSrc={giveIcnSrc} lblSz="r2" txtSrc="1" txt={false} />
        </_Builtin.Block>
      ) : null}
      {share ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "post-act-item")}
          tag="div"
          {...shareClick}
        >
          <Label lblSz="r2" icnSrc="act_share" txt={false} />
        </_Builtin.Block>
      ) : null}
      {bookmark ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "post-act-item")}
          tag="div"
          {...bookmarkClick}
        >
          <Label icnSrc={bookmarkIcnSrc} lblSz="r2" txt={false} />
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
