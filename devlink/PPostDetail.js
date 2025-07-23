"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Post } from "./Post";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./PPostDetail.module.css";

export function PPostDetail({
  as: _Component = _Builtin.Block,
  header = true,
  hdrImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  hdrImgAlt = "__wf_reserved_inherit",
  hdrTitleSrc = "ItemName description goes here andline wraps",
  hdrTitleSz = "r4",
  hdrSubtxt = false,
  hdrSubtxtSrc = "post subtxt goes here, address",
  gttrPin = false,
  gttrAlarm = false,
  gttrBookmark = false,
  postMoreClick = {},
  postTime = "5d",
  title = true,
  titleSrc = "Post Title goes here and line wraps",
  bodySrc = "Body of the post goes in this location with any media attachments below text copy. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
  bodyAcrd = false,
  bodyAcrdClick = {},
  bodyAcrdTxtSrc = "more",
  bodyAcrdIcnSrc = "nav_down",
  rank = true,
  rankMoreClick = {},
  rankQty = "0",
  rankLessClick = {},
  media = false,
  mediaMap,
  mediaExample = true,
  atrb = true,
  atrbBdg = true,
  atrbAvtr = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  atrbAvtrAlt = "__wf_reserved_inherit",
  atrbName = "FName LName",
  atrbStat1 = true,
  atrbStat1Src = "Rank",
  atrbStat1Icn = false,
  atrbStat1IcnSrc = "view",
  atrbClick = {},
  act = true,
  actLike = true,
  actLikeQty = false,
  actLikeQtySrc = "1",
  actLikeIcnSrc = "act_like",
  actLikeClick = {},
  actComment = true,
  actCommentQty = false,
  actCommentQtySrc = "1",
  actCommentIcnSrc = "chat",
  actCommentClick = {},
  actGive = false,
  actGiveIcnSrc = "i_wish",
  actGiveClick = {},
  actShare = true,
  actShareClick = {},
  actBookmark = true,
  actBookmarkIcnSrc = "act_bookmark",
  actBookmarkClick = {},
  resp = true,
  respQty = "No",
  respName = "Responses",
  respList = true,
  respListMap,
  respItemExample = false,
  respEmpty = true,
  respEmptyIcnSrc = "quest_ans",
  respEmptyHlineSrc = "Have an Opinion?",
  respEmptySubTxtSrc = "Have more to add to this, or want to bring more clarity to the contents. Let the community know",
  respEmptyCtaTxtSrc = "Make a Comment",
  respEmptyClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "bqg_review-detail")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "item_sec-span")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "itemrev-col1")}
          tag="div"
        >
          <Post
            rank={rank}
            gttrPin={gttrPin}
            gttrBookmark={gttrBookmark}
            postMoreClick={postMoreClick}
            postTime={postTime}
            title={title}
            titleSrc={titleSrc}
            bodySrc={bodySrc}
            bodyAcrd={bodyAcrd}
            bodyAcrdClick={bodyAcrdClick}
            bodyAcrdTxtSrc={bodyAcrdTxtSrc}
            bodyAcrdIcnSrc={bodyAcrdIcnSrc}
            media={media}
            mediaMap={mediaMap}
            mediaExample={mediaExample}
            atrb={atrb}
            atrbAvtr={atrbAvtr}
            atrbAvtrAlt={atrbAvtrAlt}
            atrbName={atrbName}
            atrbBdg={atrbBdg}
            atrbStat1={atrbStat1}
            atrbStat1Icn={atrbStat1Icn}
            atrbStat1TxtSrc={atrbStat1Src}
            atrbStat1IcnSrc={atrbStat1IcnSrc}
            atrbClick={atrbClick}
            act={act}
            actLike={actLike}
            actLikeQty={actLikeQty}
            actLikeQtySrc={actLikeQtySrc}
            actLikeIcnSrc={actLikeIcnSrc}
            actLikeClick={actLikeClick}
            actComment={actComment}
            actCommentQty={actCommentQty}
            actCommentQtySrc={actCommentQtySrc}
            actCommentIcnSrc={actCommentIcnSrc}
            actCommentClick={actCommentClick}
            actGive={actGive}
            actGiveIcnSrc={actGiveIcnSrc}
            actGiveClick={actGiveClick}
            actShare={actShare}
            actShareClick={actShareClick}
            actBookmark={actBookmark}
            actBookmarkIcnSrc={actBookmarkIcnSrc}
            actBookmarkClick={actBookmarkClick}
            resp={resp}
            respQty={respQty}
            respName={respName}
            respList={respList}
            respListMap={respListMap}
            respItemExample={respItemExample}
            respEmpty={respEmpty}
            respEmptyIcnSrc={respEmptyIcnSrc}
            respEmptyHlineSrc={respEmptyHlineSrc}
            respEmptySubTxtSrc={respEmptySubTxtSrc}
            respEmptyCtaTxtSrc={respEmptyCtaTxtSrc}
            respEmptyClick={respEmptyClick}
            rankMoreClick={rankMoreClick}
            rankQty={rankQty}
            rankLessClick={rankLessClick}
            header={header}
            hdrTitleSz={hdrTitleSz}
            hdrImgSrc={hdrImgSrc}
            hdrImgAlt={hdrImgAlt}
            hdrTitleSrc={hdrTitleSrc}
            hdrSubtxt={hdrSubtxt}
            hdrSubtxtSrc={hdrSubtxtSrc}
            gttrAlarm={gttrAlarm}
            hdrImgSz="xl"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "itemrev-col2")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-67")}
            tag="div"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <Spacer szDep="80" />
    </_Component>
  );
}
