"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { MediaHero } from "./MediaHero";
import { SecActivity } from "./SecActivity";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SnipSecPlaces.module.css";

export function SnipSecPlaces({
  as: _Component = _Builtin.Section,
  sec = true,
  secHeadTitleIcn = true,
  secHeadAct1 = false,
  secHeadAct1Icn = false,
  secHeadAct1Txt = true,
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
  conHeroTitleSrc = "Grand Opening $8 Washes",
  conHeroSubtxtSrc = "3450 Colorado Ave, Brooklyn Park",
  conHeroAtrbAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/66957adac2563976c13c0bcd_Brand.svg",
  conHeroAtrbAvtrAlt = "__wf_reserved_inherit",
  conHeroAtrbNameSrc = "Mister Car Wash",
  conHeroAtrbBdg1TxtSrc = "limit 2",
  conHeroRTxtSrc = "exp. in 2d",
  conHeroDetClick = {},
  conHeroActClick = {},
  conActvMap,
  conExampleActvItm = true,
  exActvActvSec = true,
  exActvActvSecHead = true,
  exActvActvVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb5854b_place-generic.avif",
  exActvActvVizAlt = "__wf_reserved_inherit",
  exActvActvTitleSrc = "{PlaceName}",
  exActvActvSubtxtSrc = "{PlaceAddress}",
  exActvActvRTxtSrc = "{time}",
  exActvActvAct = true,
  exActvActvActClick = {},
  exActvActvCellClick = {},
  stat1Src = "42 places",
  stat2Src = "242 visits",
  stat3Src = "$1.2k in savings",
  secHead = true,
  stats = true,
  stat4Src = "stat4",
  stat2 = true,
  stat3 = true,
  stat4 = false,
  secHeadTitleIcnSrc = "places",
  secHeadTitleSrc = "Places",
  secHeadAct1IcnSrc = "default",
  secHeadAct1TxtSrc = "See All",
  secHeadAct1Click = {},
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "fav-place-sec")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        act1={secHeadAct1}
        act1Click={secHeadAct1Click}
        titleSrc={secHeadTitleSrc}
        act1TxtSrc={secHeadAct1TxtSrc}
        titleIcn={secHeadTitleIcn}
        titleIcnSrc={secHeadTitleIcnSrc}
        secHead={secHead}
        act1Txt={secHeadAct1Txt}
        act1Icn={secHeadAct1Icn}
        act1IcnSrc={secHeadAct1IcnSrc}
        sz="m"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "sec-wrap")}
        tag="div"
        data-shadow="y"
      >
        <MediaHero
          atrbNameSrc={conHeroAtrbNameSrc}
          subtxtSrc={conHeroSubtxtSrc}
          atrbAvtrSrc={conHeroAtrbAvtrSrc}
          vizImgSrc={conHeroVizSrc}
          vizImgAlt={conHeroVizAlt}
          vizVideoSrc={conHeroVideoSrc}
          vizClick={conHeroVizClick}
          atrbAvtrAlt={conHeroAtrbAvtrAlt}
          atrbTimeSrc={conHeroRTxtSrc}
          captClick={conHeroDetClick}
          actClick={conHeroActClick}
          titleSrc={conHeroTitleSrc}
          atrbBdg1TxtSrc={conHeroAtrbBdg1TxtSrc}
          vizVideo={conHeroVideo}
          subtxt={true}
          atrb={true}
          atrbTime={true}
          gttrBdg={false}
          atrbPeep={false}
          atrbBrand={true}
          atrbAvtrShape="r"
          isVid={false}
          isOffer={true}
        />
        <SecActivity
          exampleTitleSrc={exActvActvTitleSrc}
          exampleSubtxtSrc={exActvActvSubtxtSrc}
          exampleVizSrc={exActvActvVizSrc}
          conListMap={conActvMap}
          conExampleListItm={conExampleActvItm}
          exampleVizAlt={exActvActvVizAlt}
          exampleTimeSrc={exActvActvRTxtSrc}
          exampleAct={exActvActvAct}
          exampleActClick={exActvActvActClick}
          exampleCellClick={exActvActvCellClick}
          sec={exActvActvSec}
          secHead={exActvActvSecHead}
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
