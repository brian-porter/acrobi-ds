"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { MediaHero } from "./MediaHero";
import { SecOffer } from "./SecOffer";
import { SecActivity } from "./SecActivity";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SnipSecOffer.module.css";

export function SnipSecOffer({
  as: _Component = _Builtin.Section,
  sec = true,
  stats = true,
  secHeadTitleIcn = true,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "offer",
  secHeadTitleSrc = "Offers",
  secHeadAct1TxtSrc = "See All",
  secHeadAct1Click = {},
  conHeroVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664e68130573df244d21d9b9_billboard-default.avif",
  conHeroVizAlt = "__wf_reserved_inherit",
  conHeroVideo = false,

  conHeroVideoSrc = {
    width: 940,
    height: 528,
    title: "Placeholder Video",
    url: "//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2Foznr-1-poSU%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Doznr-1-poSU&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2Foznr-1-poSU%2Fhqdefault.jpg&type=text%2Fhtml&schema=youtube",
  },

  conHeroVizClick = {},
  conHeroTitleSrc = "{OfferHook}",
  conHeroSubtxtSrc = "{ProductName}",
  conHeroAtrbNameSrc = "BrandName",
  conHeroAtrbVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/66957adac2563976c13c0bcd_Brand.svg",
  conHeroAtrbVizAlt = "__wf_reserved_inherit",
  conHeroAtrbBdg1TxtSrc = "limit 2",
  conHeroRTxtSrc = "exp. in 2d",
  conHeroDetClick = {},
  conHeroActClick = {},
  conSec1Map,
  conExampleSec1Offer = true,
  conActvMap,
  conExampleActvItm = true,
  exSec1Sec1Sec = true,
  exSec1Sec1SecHead = true,
  exSec1Sec1VizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif",
  exSec1Sec1VizAlt = "__wf_reserved_inherit",
  exSec1Sec1NameSrc = "ProductName here with a wrap to a 2nd line and truncation at the second lines here with a line clamp",
  exSec1Sec1HookSrc = "$0.00 Off",
  exSec1Sec1ByVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  exSec1Sec1TypeSrc = "in store",
  exSec1Sec1LimitSrc = "limit 2",
  exSec1Sec1ActClick = {},
  exSec1Sec1CellClick = {},
  exActvActvSec = true,
  exActvActvSecHead = true,
  exActvActvVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif",
  exActvActvVizAlt = "__wf_reserved_inherit",
  exActvActvTitleSrc = "{OfferHook}",
  exActvActvSubtxtSrc = "ProductName goes here",
  exActvActvRTxtSrc = "4h",
  exActvActvAct = true,
  exActvActvActClick = {},
  exActvActvCellClick = {},
  stat1Src = "42 offers",
  stat2Src = "248 clips",
  stat3Src = "$1k in savings",
  stat4Src = "stat4",
  stat2 = true,
  stat3 = true,
  stat4 = false,
  secHead = true,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "offer-sec")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        act1Click={secHeadAct1Click}
        act1={secHeadAct1}
        titleSrc={secHeadTitleSrc}
        act1TxtSrc={secHeadAct1TxtSrc}
        titleIcn={secHeadTitleIcn}
        titleIcnSrc={secHeadTitleIcnSrc}
        secHead={secHead}
        sz="m"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "sec-wrap")}
        tag="div"
        data-shadow="y"
      >
        <MediaHero
          titleSrc={conHeroTitleSrc}
          subtxtSrc={conHeroSubtxtSrc}
          captClick={conHeroDetClick}
          actClick={conHeroActClick}
          vizImgSrc={conHeroVizSrc}
          vizImgAlt={conHeroVizAlt}
          vizVideo={conHeroVideo}
          vizVideoSrc={conHeroVideoSrc}
          atrbAvtrSrc={conHeroAtrbVizSrc}
          atrbNameSrc={conHeroAtrbNameSrc}
          atrbAvtrAlt={conHeroAtrbVizAlt}
          atrbTimeSrc={conHeroRTxtSrc}
          vizClick={conHeroVizClick}
          atrbBdg1TxtSrc={conHeroAtrbBdg1TxtSrc}
          subtxt={true}
          atrb={true}
          gttrBdg={false}
          atrbAvtrShape="r"
          isVid={false}
          isOffer={true}
          titleSz="r1"
        />
        <SecOffer
          sec={exSec1Sec1Sec}
          secHead={exSec1Sec1SecHead}
          conCellMap={conSec1Map}
          conExampleCell={conExampleSec1Offer}
          exampleVizSrc={exSec1Sec1VizSrc}
          exampleVizAlt={exSec1Sec1VizAlt}
          exampleNameSrc={exSec1Sec1NameSrc}
          exampleHookSrc={exSec1Sec1HookSrc}
          exampleByVizSrc={exSec1Sec1ByVizSrc}
          exampleTypeSrc={exSec1Sec1TypeSrc}
          exampleLimitSrc={exSec1Sec1LimitSrc}
          exampleActClick={exSec1Sec1ActClick}
          exampleCellClick={exSec1Sec1CellClick}
          secHeadTitleSrc="Recent Additions"
        />
        <SecActivity
          exampleTitleSrc={exActvActvTitleSrc}
          exampleSubtxtSrc={exActvActvSubtxtSrc}
          exampleVizSrc={exActvActvVizSrc}
          sec={exActvActvSec}
          secHead={exActvActvSecHead}
          conListMap={conActvMap}
          conExampleListItm={conExampleActvItm}
          exampleVizAlt={exActvActvVizAlt}
          exampleTimeSrc={exActvActvRTxtSrc}
          exampleAct={exActvActvAct}
          exampleActClick={exActvActvActClick}
          exampleCellClick={exActvActvCellClick}
        />
        <StatsBar
          stat1Src={stat1Src}
          stat2Src={stat2Src}
          stat3Src={stat3Src}
          stat4={stat4}
          stats={stats}
          stat4Src={stat4Src}
          stat3={stat3}
          stat2={stat2}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
