"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GutterBadge } from "./GutterBadge";
import { Label } from "./Label";
import { PostAtrbItem } from "./PostAtrbItem";
import { Button } from "./Button";
import * as _utils from "./utils";
import _styles from "./VideoItem.module.css";

export function VideoItem({
  as: _Component = _Builtin.Block,
  videoItem = true,
  type = "grid",
  cellSz,
  rank = false,
  rankMoreClick = {},
  gttrBdg = false,
  gttrPin = false,
  gttrAlarm = false,
  gttrBookmark = false,
  moreClick = {},
  postImg = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/65a5d8d45f707e960725a62c_video-default.svg",
  postImgAlt = "__wf_reserved_inherit",
  postLength = "00:00",
  postImgClick = {},
  bodySrc = "Name of the video goes here withline wrap to second line max really long line here to test the line wrap and truncate at the second",
  bodyLc = "2",
  atrb = true,
  atrbAvtr = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  atrbAvtrAlt = "__wf_reserved_inherit",
  atrbName = "ChannelName",
  atrbBdg = true,
  atrbStat1TxtSrc = "1",
  atrbClick = {},
  atrbTime = true,
  atrbTimeSrc = "5d",
}) {
  return videoItem ? (
    <_Component
      className={_utils.cx(_styles, "c-post-vid")}
      tag="div"
      data-cell-size={cellSz}
      data-type={type}
    >
      <GutterBadge
        pin={gttrPin}
        bookmark={gttrBookmark}
        gttrBdg={gttrBdg}
        alarm={gttrAlarm}
      />
      <_Builtin.Block className={_utils.cx(_styles, "post-contain")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "empty-visual")}
          tag="div"
          {...postImgClick}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "post-img-wrap")}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "post-img")}
              loading="lazy"
              width="auto"
              height="auto"
              data-obj-asp="16-9"
              src={postImg}
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "ol-length-br")}
              tag="div"
            >
              <Label txtSrc={postLength} lblSz="r4" icn={false} />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "post-caption")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "post-stack")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "post-desc")}
              tag="div"
              data-lc={bodyLc}
              data-clr="n700"
            >
              {bodySrc}
            </_Builtin.Block>
            <PostAtrbItem
              atrbClick={atrbClick}
              atrbAvtrSrc={atrbAvtr}
              atrbAvtrAlt={atrbAvtrAlt}
              atrbNameSrc={atrbName}
              atrbBdg={atrbBdg}
              atrb={atrb}
              atrbBdg1TxtSrc={atrbStat1TxtSrc}
              atrbBdg1Icn={true}
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "post-aside")}
            tag="div"
          >
            <Button
              btnClick={moreClick}
              btnStyl="nt"
              btnTxt={false}
              btnIcnSrc="Moreh"
              lblClr="n300"
              btnSz="m"
            />
            {atrbTime ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "post-time")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "atrb-time")}
                  tag="div"
                >
                  {atrbTimeSrc}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
            <Button
              btnClick={rankMoreClick}
              btn={rank}
              btnStyl="nf"
              btnTxt={true}
              btnIcnSrc="Nav_up"
              lblClr="n300"
              btnSz="s"
              btnTxtSrc=""
              btnIcnLoc="r"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A.c-post-vid%5Bdata-type%3D%22list%22%5D%20%7B%0A%09height%3A%2096px%3B%0A%7D%0A.c-post-vid%5Bdata-type%3D%22list%22%5D%20.post-contain%20%7B%0A%09flex-direction%3A%20row%3B%0A%20%20gap%3A%208px%3B%0A%7D%0A.c-post-vid%5Bdata-type%3D%22list%22%5D%20*%20.post-img-wrap%20%7B%0A%09height%3A%2080px%3B%0A%7D%0A%3C%2Fstyle%3E" />
    </_Component>
  ) : null;
}
