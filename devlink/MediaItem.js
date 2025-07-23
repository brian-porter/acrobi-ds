"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GutterBadge } from "./GutterBadge";
import { Label } from "./Label";
import { PostAtrbItem } from "./PostAtrbItem";
import { Button } from "./Button";
import * as _utils from "./utils";
import _styles from "./MediaItem.module.css";

export function MediaItem({
  as: _Component = _Builtin.Block,
  mediaItem = true,
  id = "media-item",
  viz = true,
  vizVideo = false,
  vizImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664e68130573df244d21d9b9_billboard-default.avif",
  vizImgAlt = "__wf_reserved_inherit",

  vizVideoSrc = {
    width: 940,
    height: 528,
    title: "Placeholder Video",
    url: "//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2Foznr-1-poSU%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Doznr-1-poSU&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2Foznr-1-poSU%2Fhqdefault.jpg&type=text%2Fhtml&schema=youtube",
  },

  vizValue = false,
  vizValueSrc = "00:00",
  vizClick = {},
  gttrPin = false,
  gttrBkmrk = false,
  capt = true,
  moreClick = {},
  titleSrc = "GroupName goes here with line wrap to second line max really long line here to test the line wrap and truncate at the second",
  titleSz = "r3",
  titleLc = "2",
  subtxt = false,
  subtxtSrc = "SubTxt here with truncation at one line",
  atrb = true,
  atrbName = false,
  atrbNameSrc = "GroupName",
  atrbAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  atrbAvtrAlt = "__wf_reserved_inherit",
  atrbAvtr2 = true,
  atrbAvtr3 = false,
  atrbAvtr4 = false,
  atrbAvtr5 = false,
  atrbAvtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  atrbAvtr2Alt = "__wf_reserved_inherit",
  atrbAvtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  atrbAvtr3Alt = "__wf_reserved_inherit",
  atrbAvtr4Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  atrbAvtr4Alt = "__wf_reserved_inherit",
  atrbAvtr5Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  atrbAvtr5Alt = "__wf_reserved_inherit",
  atrbBdg = true,
  atrbBdg1TxtSrc = "156",
  atrbBdg1IcnSrc = "members",
  atrbClick = {},
  atrbTime = true,
  atrbTimeSrc = "14h",
  captClick = {},
}) {
  return mediaItem ? (
    <_Component
      className={_utils.cx(_styles, "c-media-item")}
      tag="div"
      id={id}
    >
      <GutterBadge pin={gttrPin} bookmark={gttrBkmrk} gttrBdg={false} />
      <_Builtin.Block className={_utils.cx(_styles, "post-contain")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "empty-visual")}
          tag="div"
          {...vizClick}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "post-img-wrap")}
            tag="div"
          >
            {vizVideo ? <_Builtin.Video options={vizVideoSrc} /> : null}
            {viz ? (
              <_Builtin.Image
                className={_utils.cx(_styles, "post-img")}
                loading="lazy"
                width="auto"
                height="auto"
                src={vizImgSrc}
              />
            ) : null}
            {vizValue ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "ol-length-br")}
                tag="div"
              >
                <Label txtSrc={vizValueSrc} lblSz="r4" icn={false} />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
        {capt ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "post-caption")}
            tag="div"
            {...captClick}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "post-stack")}
              tag="div"
              {...atrbClick}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "post-desc")}
                tag="div"
                data-lc={titleLc}
                data-lbl-size={titleSz}
              >
                {titleSrc}
              </_Builtin.Block>
              {subtxt ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "postsubtxt")}
                  tag="div"
                >
                  {subtxtSrc}
                </_Builtin.Block>
              ) : null}
              <PostAtrbItem
                atrbAvtrSrc={atrbAvtrSrc}
                atrbAvtrAlt={atrbAvtrAlt}
                atrbNameSrc={atrbNameSrc}
                atrbBdg={atrbBdg}
                atrb={atrb}
                atrbBdg1TxtSrc={atrbBdg1TxtSrc}
                atrbAvtr2={atrbAvtr2}
                atrbName={atrbName}
                atrbAvtr3={atrbAvtr3}
                atrbAvtr4={atrbAvtr4}
                atrbAvtr5={atrbAvtr5}
                atrbAvtr2Src={atrbAvtr2Src}
                atrbAvtr3Src={atrbAvtr3Src}
                atrbAvtr4Src={atrbAvtr4Src}
                atrbAvtr5Src={atrbAvtr5Src}
                atrbAvtr2Alt={atrbAvtr2Alt}
                atrbAvtr3Alt={atrbAvtr3Alt}
                atrbAvtr4Alt={atrbAvtr4Alt}
                atrbAvtr5Alt={atrbAvtr5Alt}
                atrbBdg1IcnSrc={atrbBdg1IcnSrc}
                atrbClick={{}}
                atrbBdg1Icn={true}
                atrbBdg2IcnSrc="member"
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
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
