"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./PostRespActions.module.css";

export function PostRespActions({
  as: _Component = _Builtin.Block,
  postRespAct = true,
  respLike = true,
  respLikeQty = false,
  respLikeQtySrc = "1",
  respLikeIcnSrc = "act_like",
  respLikeClick = {},
  respCmnt = true,
  respCmntQty = false,
  respCommentQtySrc = "1",
  respCmntIcnSrc = "chat",
  respCmntClick = {},
}) {
  return postRespAct ? (
    <_Component className={_utils.cx(_styles, "post-resp-act")} tag="div">
      {respLike ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "post-resp-act-item")}
          tag="div"
          {...respLikeClick}
        >
          <Label
            icnSrc={respLikeIcnSrc}
            txtSrc={respLikeQtySrc}
            txt={respLikeQty}
            lblSz="r4"
          />
        </_Builtin.Block>
      ) : null}
      {respCmnt ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "post-resp-act-item")}
          tag="div"
          {...respCmntClick}
        >
          <Label
            icnSrc={respCmntIcnSrc}
            txtSrc={respCommentQtySrc}
            txt={respCmntQty}
            lblSz="r4"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
