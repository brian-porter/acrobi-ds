"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GutterBadge } from "./GutterBadge";
import { Rating } from "./Rating";
import { PostMedia } from "./PostMedia";
import { Label } from "./Label";
import { PostAtrbItem } from "./PostAtrbItem";
import { PostMoreLink } from "./PostMoreLink";
import { PostActions } from "./PostActions";
import { PostRespList } from "./PostRespList";
import { Button } from "./Button";
import { InputStepper } from "./InputStepper";
import * as _utils from "./utils";
import _styles from "./PostItem.module.css";

export function PostItem({
  as: _Component = _Builtin.Block,
  postItem = true,
  rating = false,
  rank = true,
  rankMoreClick = {},
  rankQty = "0",
  rankLessClick = {},
  gttrPin = false,
  gttrAlarm = false,
  gttrBookmark = false,
  moreClick = {},
  titleSrc = "Title description goes here and line wraps",
  ratingSrc = "3.5",
  media = false,
  mediaMap,
  mediaExample = true,
  bodySrc = (
    <>
      {
        "Body copy goes here lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
      }
      <br />
      <br />
      {
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. "
      }
    </>
  ),
  bodyLc = "5",
  bodyClick = {},
  bodyAcrd = false,
  bodyAcrdClick = {},
  bodyAcrdTxtSrc = "more",
  bodyAcrdIcnSrc = "nav_down",
  atrb = true,
  atrbAvtr = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  atrbAvtrAlt = "__wf_reserved_inherit",
  atrbName = "AttributorName",
  atrbBdg = true,
  atrbStat1TxtSrc = "MbrRank",
  atrbClick = {},
  atrbTime = "5d",
  morePosts = false,
  morePostsQty = "3",
  morePostsClick = {},
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
  actShare = true,
  actShareClick = {},
  actBookmark = true,
  actBookmarkIcnSrc = "act_bookmark",
  actBookmarkClick = {},
  resp = true,
  respQty = "No",
  respName = "Responses",
  respListMap,
  respItemExample = false,
  respEmpty = true,
  respEmptyClick = {},
}) {
  return postItem ? (
    <_Component className={_utils.cx(_styles, "c-post-item")} tag="div">
      <GutterBadge
        pin={gttrPin}
        bookmark={gttrBookmark}
        alarm={gttrAlarm}
        gttrBdg={true}
      />
      <_Builtin.Block className={_utils.cx(_styles, "post-wrap")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "post-stack")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "post-detail")}
            tag="div"
            {...bodyClick}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "post-title-r2")}
              tag="div"
            >
              {titleSrc}
            </_Builtin.Block>
            <Rating qtySrc={ratingSrc} rating={rating} />
            <PostMedia
              media={media}
              mediaMap={mediaMap}
              mediaExample={mediaExample}
            />
            <_Builtin.Paragraph
              className={_utils.cx(_styles, "post-copy")}
              lc={bodyLc}
            >
              {bodySrc}
            </_Builtin.Paragraph>
            {bodyAcrd ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "post-acrd")}
                tag="div"
                {...bodyAcrdClick}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "acrd-fade-btm")}
                  tag="div"
                  wfr-c="OLB-Fade"
                />
                <Label
                  txtSrc={bodyAcrdTxtSrc}
                  icnSrc={bodyAcrdIcnSrc}
                  lblSz="r3"
                  icnLoc="r"
                  lblGap="4"
                />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <PostAtrbItem
            atrbClick={atrbClick}
            atrbAvtrSrc={atrbAvtr}
            atrbAvtrAlt={atrbAvtrAlt}
            atrbNameSrc={atrbName}
            atrbBdg={atrbBdg}
            atrb={atrb}
            atrbBdg1TxtSrc={atrbStat1TxtSrc}
          />
          <PostMoreLink
            morePosts={morePosts}
            morePostsQty={morePostsQty}
            morePostsClick={morePostsClick}
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
          />
          <PostRespList
            respListMap={respListMap}
            respEmpty={respEmpty}
            respEmptyClick={respEmptyClick}
            respItemExample={respItemExample}
            resp={resp}
            respName={respName}
            respQty={respQty}
          />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "post-aside")} tag="div">
          <Button
            btnClick={moreClick}
            btnStyl="nt"
            btnTxt={false}
            btnIcnSrc="Moreh"
            lblClr="n300"
          />
          <InputStepper
            inptStep={rank}
            qty={rankQty}
            moreClick={rankMoreClick}
            lessClick={rankLessClick}
            inpstepBg="n100"
            inptStepIcnClr="n300"
            valueTxtClr="n"
            inptStepOri="v"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
