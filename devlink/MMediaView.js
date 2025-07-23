"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { PostAtrbDetail } from "./PostAtrbDetail";
import { PostContent } from "./PostContent";
import { Button } from "./Button";
import { SecHead } from "./SecHead";
import { Swiper } from "./Swiper";
import * as _utils from "./utils";
import _styles from "./MMediaView.module.css";

export function MMediaView({
  as: _Component = _Builtin.Block,
  mediaView = true,
  bbc = true,
  baseHead = true,
  titleSrc = "ImageTitle",
  subtxtSrc = "xx items",
  titleClick = {},
  moreClick = {},
  postPostHead = false,
  postPostAtrbAvtr = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  postPostAtrbAvtrAlt = "__wf_reserved_inherit",
  postPostAtrbName = "FName LName",
  postPostAtrbRankSrc = "Rank",
  postPostAtrbRank = true,
  postPostAtrbClick = {},
  postPostAtrbAct = true,
  postPostAtrbActMoreClick = {},
  postPostAtrbActTime = "3d",
  postPostTitle = true,
  postPostTitleSrc = "Review Title goes here and line wraps",
  postPostBodySrc = "Body of the review goes in this location with any media attachments below text copy. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
  postPostExpIcnSrc = "Nav_down",
  postPostExpClick = {},
  bbcImgBarMap,
  bbcExampleImgBar = true,
  bbcImgBarImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  bbcImgBarImgAlt = "__wf_reserved_inherit",
  bbcImgBarImgActv = false,
  bbcImgBarImgClick = {},
  bbcNavMap,
  bbcExampleNav = true,
  bbcBtnBack = true,
  bbcTbrEdit = true,
  bbcTbrShare = true,
  bbcTbrBkmrk = true,
  bbcTbrDlt = true,
  bbcBtnDo = false,
  bbcBtnBackClick = {},
  bbcTbrEditClick = {},
  bbcTbrShareClick = {},
  bbcTbrBkmrkClick = {},
  bbcTbrDltClick = {},
  bbcBtnDoClick = {},
  swipeSlideMap,
  exampleSwipeSlide = true,
  swipeSlideDetailMap,
  exampleSwipeSlideDetail = true,
  bgClr,
}) {
  return mediaView ? (
    <_Component
      className={_utils.cx(_styles, "media_view")}
      tag="section"
      data-bg-clr={bgClr}
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        {postPostHead ? (
          <_Builtin.Block className={_utils.cx(_styles, "post-head")} tag="div">
            <PostAtrbDetail
              atrbActTime={postPostAtrbActTime}
              atrbRank={postPostAtrbRank}
              atrbAvtr={postPostAtrbAvtr}
              atrbAvtrAlt={postPostAtrbAvtrAlt}
              atrbName={postPostAtrbName}
              atrbRankSrc={postPostAtrbRankSrc}
              atrbClick={postPostAtrbClick}
              atrbActMoreClick={postPostAtrbActMoreClick}
              atrbAct={postPostAtrbAct}
              atrbRankClr="grey-500"
              atrbActTimeClr="grey-500"
              atrbActMoreClr="grey-500"
              atrbNameClr="in"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "post-detail-stack")}
              tag="div"
            >
              <PostContent
                titleSrc={postPostTitleSrc}
                bodySrc={postPostBodySrc}
                title={postPostTitle}
                bodyClamp="3"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "post-exp")}
              tag="div"
            >
              <Button
                btnIcnSrc={postPostExpIcnSrc}
                btnClick={postPostExpClick}
                btnTxtSrc="Expand"
                btnHug=""
                btnTxt={false}
                lblClr="n500"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {baseHead ? (
          <_Builtin.Block className={_utils.cx(_styles, "base-head")} tag="div">
            <SecHead
              titleSrc={titleSrc}
              act1Click={moreClick}
              subtxtSrc={subtxtSrc}
              titleClick={titleClick}
              sz="l"
              act1TxtSrc="More"
              act1IcnSrc="Moreh"
              act1Txt={false}
              act1Icn={true}
              act2={false}
              act2Txt={false}
              act1Clr="n500"
              act1={false}
              act1Styl="nt"
              act2TxtSrc="Filter"
              act2IcnSrc=""
              secHead={true}
              gttrBdgPin={false}
              gttrBdgAlarm={false}
              titleSz="h4"
              titleIcn={true}
              titleIcnSz="sm"
              titleIcnSrc="info_act"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body-fixed")} tag="div">
        <Swiper
          slideMap={swipeSlideMap}
          exampleSlide={exampleSwipeSlide}
          slideDetailMap={swipeSlideDetailMap}
          exampleSlideDetail={exampleSwipeSlideDetail}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
