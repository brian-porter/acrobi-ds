"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GutterBadge } from "./GutterBadge";
import { Label } from "./Label";
import { OlIconbarAction } from "./OlIconbarAction";
import { CaptionHero } from "./CaptionHero";
import * as _utils from "./utils";
import _styles from "./OfferHero.module.css";

export function OfferHero({
  as: _Component = _Builtin.Block,
  offerHero = true,
  vizImg = true,
  vizVid = false,
  offAd = false,
  vizImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664e68130573df244d21d9b9_billboard-default.avif",
  vizImgAlt = "__wf_reserved_inherit",

  vizVidSrc = {
    width: 940,
    height: 528,
    title: "Placeholder Video",
    url: "//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2Foznr-1-poSU%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Doznr-1-poSU&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2Foznr-1-poSU%2Fhqdefault.jpg&type=text%2Fhtml&schema=youtube",
  },

  titleSrc = "Offer Title here with truncation at one line",
  byImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  byImgAlt = "__wf_reserved_inherit",
  byTxtSrc = "OfferbyName",
  expSrc = "expires in 2d",
  vizClick = {},
  captClick = {},
  addClick = {},
}) {
  return offerHero ? (
    <_Component className={_utils.cx(_styles, "offer-hero")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "gttr-breakout")} tag="div">
        <GutterBadge pin={false} bookmark={false} gttrBdg={true} />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "post-contain")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "hero-click")}
          tag="div"
          {...vizClick}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "hero-img-wrap2")}
            tag="div"
          >
            {vizVid ? <_Builtin.Video options={vizVidSrc} /> : null}
            {vizImg ? (
              <_Builtin.Image
                className={_utils.cx(_styles, "post-img")}
                width="Auto"
                height="Auto"
                loading="lazy"
                src={vizImgSrc}
              />
            ) : null}
          </_Builtin.Block>
          <OlIconbarAction
            icnBar={false}
            l1IcnL1Src="Qr"
            r1IcnR1Src="Moreh"
            l1IcnL1Clr="n000"
            r1IcnR1Clr="n000"
            l1IcnL1Click={{}}
            r1IcnR1Click={{}}
          />
        </_Builtin.Block>
        <CaptionHero isVideo={false} isOffer={true} />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
