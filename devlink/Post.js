"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GutterBadge } from "./GutterBadge";
import { PostHeader } from "./PostHeader";
import { PostMedia } from "./PostMedia";
import { PostContent } from "./PostContent";
import { PostAtrbItem } from "./PostAtrbItem";
import { PostActions } from "./PostActions";
import { PostRespList } from "./PostRespList";
import { Button } from "./Button";
import { InputStepper } from "./InputStepper";
import * as _utils from "./utils";
import _styles from "./Post.module.css";

export function Post({
  as: _Component = _Builtin.Block,
  post = true,
  id = "post",
  header = false,
  rating = false,
  rank = false,
  hdrImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  hdrImgAlt = "__wf_reserved_inherit",
  hdrImgSz = "l",
  hdrTitleSrc = "PostSubject",
  hdrTitleSz = "r2",
  hdrSubtxt = false,
  hdrSubtxtSrc = "post subtxt goes here, address",
  rankMoreClick = {},
  rankQty = "0",
  rankLessClick = {},
  gttrPin = false,
  gttrAlarm = false,
  gttrBookmark = false,
  postMoreClick = {},
  postTime = "5d",
  title = true,
  titleSrc = "Post Title goes here and line wraps",
  ratingSrc = "3.5",
  bodySrc = (
    <>
      {
        "Body of the post goes in this location with any media attachments below text copy. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
      }
      <br />
      <br />
      {
        "Body of the post goes in this location with any media attachments below text copy. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
      }
    </>
  ),
  bodyAcrd = false,
  bodyAcrdClick = {},
  bodyAcrdTxtSrc = "more",
  bodyAcrdIcnSrc = "nav_down",
  media = false,
  mediaMap,
  mediaExample = true,
  atrb = true,
  atrbAvtr = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  atrbAvtrAlt = "__wf_reserved_inherit",
  atrbName = "AttributorName",
  atrbBdg = true,
  atrbStat1 = true,
  atrbStat1Icn = false,
  atrbStat1TxtSrc = "MbrRank",
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
  return post ? (
    <_Component className={_utils.cx(_styles, "post-wrap")} tag="div" id={id}>
      <_Builtin.Block className={_utils.cx(_styles, "post-gutter")} tag="div">
        <GutterBadge
          pin={gttrPin}
          bookmark={gttrBookmark}
          alarm={gttrAlarm}
          gttrBdg={true}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "post-detail-stack")}
        tag="div"
      >
        <PostHeader
          header={header}
          hdrImgSrc={hdrImgSrc}
          hdrImgAlt={hdrImgAlt}
          hdrTitleSrc={hdrTitleSrc}
          hdrSubtxtSrc={hdrSubtxtSrc}
          hdrSubtxt={hdrSubtxt}
          hdrImgSz={hdrImgSz}
          hdrTitleSz={hdrTitleSz}
        />
        <PostMedia
          media={media}
          mediaMap={mediaMap}
          mediaExample={mediaExample}
        />
        <PostContent
          titleSrc={titleSrc}
          bodySrc={bodySrc}
          title={title}
          acrd={bodyAcrd}
          acrdClick={bodyAcrdClick}
          acrdTxtSrc={bodyAcrdTxtSrc}
          acrdIcnSrc={bodyAcrdIcnSrc}
          rating={rating}
          ratingSrc={ratingSrc}
        />
        <PostAtrbItem
          atrbClick={atrbClick}
          atrbAvtrSrc={atrbAvtr}
          atrbAvtrAlt={atrbAvtrAlt}
          atrbNameSrc={atrbName}
          atrbBdg={atrbBdg}
          atrb={atrb}
          atrbBdg1TxtSrc={atrbStat1TxtSrc}
          atrbBdg1={atrbStat1}
          atrbBdg1Icn={atrbStat1Icn}
          atrbBdg1IcnSrc={atrbStat1IcnSrc}
        />
        <PostActions
          postAct={act}
          like={actLike}
          likeQty={actLikeQty}
          likeQtySrc={actLikeQtySrc}
          likeIcnSrc={actLikeIcnSrc}
          likeClick={actLikeClick}
          comment={actComment}
          commentQty={actCommentQty}
          commentQtySrc={actCommentQtySrc}
          commentIcnSrc={actCommentIcnSrc}
          commentClick={actCommentClick}
          share={actShare}
          shareClick={actShareClick}
          bookmark={actBookmark}
          bookmarkIcnSrc={actBookmarkIcnSrc}
          bookmarkClick={actBookmarkClick}
          give={actGive}
          giveIcnSrc={actGiveIcnSrc}
          giveClick={actGiveClick}
        />
        <PostRespList
          respListMap={respListMap}
          resp={resp}
          respName={respName}
          respQty={respQty}
          respList={respList}
          respEmpty={respEmpty}
          respEmptyClick={respEmptyClick}
          respItemExample={respItemExample}
          respEmptyIcnSrc={respEmptyIcnSrc}
          respEmptyHlineSrc={respEmptyHlineSrc}
          respEmptySubTxtSrc={respEmptySubTxtSrc}
          respEmptyCtaTxtSrc={respEmptyCtaTxtSrc}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "post-detail-aside")}
        tag="div"
      >
        <Button
          btnClick={postMoreClick}
          btnStyl="nt"
          btnTxt={false}
          btnIcnSrc="Moreh"
          lblClr="n300"
        />
        <_Builtin.Block className={_utils.cx(_styles, "post-time")} tag="div">
          <_Builtin.Block className={_utils.cx(_styles, "atrb-time")} tag="div">
            {postTime}
          </_Builtin.Block>
        </_Builtin.Block>
        <InputStepper
          inptStep={rank}
          qty={rankQty}
          moreClick={rankMoreClick}
          lessClick={rankLessClick}
          inpstepBg="n100"
          inptStepIcnClr="n300"
          valueTxtClr="n"
          inptStepOri="v"
          inptStepShdw="xs"
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
