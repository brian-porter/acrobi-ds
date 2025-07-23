"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GutterBadge } from "./GutterBadge";
import { Label } from "./Label";
import { OlIconbarAction } from "./OlIconbarAction";
import { CaptionHero } from "./CaptionHero";
import * as _utils from "./utils";
import _styles from "./MediaHero.module.css";

export function MediaHero({
  as: _Component = _Builtin.Block,
  mediaHero = true,
  isVid = true,
  isList = false,
  isOffer = false,
  viz = true,
  vizVideo = false,
  vizIcnBar = false,
  vizQrClick = {},
  vizMoreClick = {},
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
  gttrBdg = true,
  gttrPin = false,
  gttrAlarm = false,
  gttrBkmrk = false,
  capt = true,
  titleSrc = "Title here with truncation at one line",
  titleSz = "r3",
  titleLc = "1",
  subtxt = false,
  subtxtSrc = "SubTxt here with truncation at one line",
  atrb = true,
  atrbPeep = true,
  atrbBrand = false,
  atrbName = true,
  atrbTime = true,
  atrbNameSrc = "AtrbName",
  atrbAvtrSz = "m",
  atrbAvtrShape = "c",
  atrbAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  atrbAvtrAlt = "__wf_reserved_inherit",
  atrbAvtr2 = false,
  atrbAvtr3 = false,
  atrbAvtr4 = false,
  atrbAvtr5 = false,
  atrbAvtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  atrbAvtr2Alt = "__wf_reserved_inherit",
  atrbAvtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  atrbAvtr3Alt = "__wf_reserved_inherit",
  atrbAvtr4Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  atrbAvtr4Alt = "__wf_reserved_inherit",
  atrbAvtr5Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  atrbAvtr5Alt = "__wf_reserved_inherit",
  atrbBdg = true,
  atrbBdg1Icn = false,
  atrbBdg1TxtSrc = "limit 2",
  atrbBdg1IcnSrc = "view",
  atrbClick = {},
  atrbTimeSrc = "exp. in 2d",
  captClick = {},
  actClick = {},
}) {
  return mediaHero ? (
    <_Component className={_utils.cx(_styles, "media-hero")} tag="div">
      <GutterBadge
        pin={gttrPin}
        bookmark={gttrBkmrk}
        gttrBdg={gttrBdg}
        alarm={gttrAlarm}
      />
      <_Builtin.Block className={_utils.cx(_styles, "post-contain")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "hero-click")}
          tag="div"
          {...vizClick}
        >
          {viz ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "hero-img-wrap")}
              tag="div"
            >
              {vizVideo ? <_Builtin.Video options={vizVideoSrc} /> : null}
              <_Builtin.Image
                className={_utils.cx(_styles, "post-img")}
                loading="lazy"
                width="auto"
                height="auto"
                src={vizImgSrc}
              />
              {vizValue ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "ol-length-br")}
                  tag="div"
                >
                  <Label txtSrc={vizValueSrc} lblSz="r4" icn={false} />
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          ) : null}
          <OlIconbarAction
            icnBar={vizIcnBar}
            l1IcnL1Click={vizQrClick}
            r1IcnR1Click={vizMoreClick}
            l1IcnL1Src="Qr"
            r1IcnR1Src="Moreh"
            l1IcnL1Clr="n000"
            r1IcnR1Clr="n000"
          />
        </_Builtin.Block>
        <CaptionHero
          titleSrc={titleSrc}
          subtxtSrc={subtxtSrc}
          subtxt={subtxt}
          atrbName={atrbName}
          atrbNameSrc={atrbNameSrc}
          atrbBdg1TxtSrc={atrbBdg1TxtSrc}
          atrbTime={atrbTime}
          atrbActClick={actClick}
          atrbTimeSrc={atrbTimeSrc}
          atrbAvtrSrc={atrbAvtrSrc}
          atrbAvtrAlt={atrbAvtrAlt}
          titleSz={titleSz}
          atrbBdg1IcnSrc={atrbBdg1IcnSrc}
          atrbBdg={atrbBdg}
          atrb={atrb}
          atrbAvtr2={atrbAvtr2}
          atrbAvtr3={atrbAvtr3}
          atrbAvtr4={atrbAvtr4}
          atrbAvtr5={atrbAvtr5}
          atrbAvtr2Src={atrbAvtr2Src}
          atrbAvtr2Alt={atrbAvtr2Alt}
          atrbAvtr3Src={atrbAvtr3Src}
          atrbAvtr3Alt={atrbAvtr3Alt}
          atrbAvtr4Src={atrbAvtr4Src}
          atrbAvtr4Alt={atrbAvtr4Alt}
          atrbAvtr5Src={atrbAvtr5Src}
          atrbAvtr5Alt={atrbAvtr5Alt}
          titleLc={titleLc}
          atrbClick={atrbClick}
          isVideo={isVid}
          isOffer={isOffer}
          isList={isList}
          captDetClick={atrbClick}
          caption={capt}
          atrbAvtrShape={atrbAvtrShape}
          atrbAvtrSz={atrbAvtrSz}
          atrbBdg1Icn={atrbBdg1Icn}
          atrbBdg1={true}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
