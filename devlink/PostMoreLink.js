"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./PostMoreLink.module.css";

export function PostMoreLink({
  as: _Component = _Builtin.Block,
  morePosts = false,
  morePostsClick = {},
  morePostsQty = "3",
}) {
  return morePosts ? (
    <_Component
      className={_utils.cx(_styles, "post-more")}
      tag="div"
      {...morePostsClick}
    >
      <Label txtSrc={morePostsQty} lblSz="r4" icnLoc="r" icn={false} />
      <Label lblSz="r4" txtSrc="more answers" icnSrc="nav_right" icnLoc="r" />
    </_Component>
  ) : null;
}
