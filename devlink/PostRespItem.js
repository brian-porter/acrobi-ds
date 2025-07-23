"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Spacer } from "./Spacer";
import { PostAtrbItem } from "./PostAtrbItem";
import { PostRespActions } from "./PostRespActions";
import * as _utils from "./utils";
import _styles from "./PostRespItem.module.css";

export function PostRespItem({
  as: _Component = _Builtin.Block,
  respItm = true,
  body = "Body of response goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
  atrbAvtr = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  atrbAvtrAlt = "__wf_reserved_inherit",
  atrbName = "PosterName",
  atrbBdg = true,
  atrbRank = "stat",
  atrbClick = {},
  atrbTime = "5d",
  respAct = true,
  respLike = true,
  respLikeQty = false,
  respLikeQtySrc = "1",
  respLikeIcnSrc = "act_like",
  respLikeClick = {},
  respComment = true,
  respCmntQty = false,
  respCmntQtySrc = "1",
  respCmntIcnSrc = "chat",
  respCmntClick = {},
}) {
  return respItm ? (
    <_Component className={_utils.cx(_styles, "post-resp")} tag="div">
      <Spacer szDep="8" size="8" />
      <_Builtin.Paragraph className={_utils.cx(_styles, "post-resp-body")}>
        {body}
      </_Builtin.Paragraph>
      <PostAtrbItem
        atrbAvtrSrc={atrbAvtr}
        atrbAvtrAlt={atrbAvtrAlt}
        atrbNameSrc={atrbName}
        atrbBdg={atrbBdg}
        atrbClick={atrbClick}
        atrbBdg1TxtSrc={atrbRank}
      />
      <PostRespActions
        postRespAct={respAct}
        respLike={respLike}
        respLikeQty={respLikeQty}
        respLikeQtySrc={respLikeQtySrc}
        respLikeIcnSrc={respLikeIcnSrc}
        respLikeClick={respLikeClick}
        respCmnt={respComment}
        respCmntQty={respCmntQty}
        respCommentQtySrc={respCmntQtySrc}
        respCmntIcnSrc={respCmntIcnSrc}
        respCmntClick={respCmntClick}
      />
    </_Component>
  ) : null;
}
