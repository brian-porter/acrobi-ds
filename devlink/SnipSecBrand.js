"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { MediaHero } from "./MediaHero";
import { SecEvent } from "./SecEvent";
import { SecActivity } from "./SecActivity";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SnipSecBrand.module.css";

export function SnipSecBrand({
  as: _Component = _Builtin.Section,
  sec = true,
  secHeadTitleIcn = true,
  secHeadAct1 = false,
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
  conHeroTitleSrc = "FuelSaver Perks",
  conHeroSubtxtSrc = "Save & earn discounts on fuel",
  conHeroAtrbNameSrc = "Hyvee",
  conHeroAtrbVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/66957adac2563976c13c0bcd_Brand.svg",
  conHeroAtrbVizAlt = "__wf_reserved_inherit",
  conHeroAtrbBdg = true,
  conHeroAtrbBdg1TxtSrc = "limit 2",
  conHeroRTxtSrc = "exp. in 2d",
  conHeroDetClick = {},
  conHeroActClick = {},
  conSec1Map,
  conExampleSec1EvntCell = true,
  conActvMap,
  conExampleActvItm = true,
  exSec1Sec1Sec = true,
  exSec1Sec1SecHead = true,
  exSec1Sec1VizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb58550_store-generic.avif",
  exSec1Sec1VizAlt = "__wf_reserved_inherit",
  exSec1Sec1TitleSrc = "EventTitle",
  exActvActvSec = true,
  exActvAcvSecHead = true,
  exActvActvVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exActvActvVizAlt = "__wf_reserved_inherit",
  exActvActvTitleSrc = "{ActivityName}",
  exActvActvSubtxtSrc = "{ActivitySubjectMatter}",
  exActvActvRTxtSrc = "{time}",
  exActvActvAct = true,
  exActvActvActClick = {},
  exActvActvCellClick = {},
  stat1Src = "57 ties",
  stat2Src = "$5.2m saved",
  stat3Src = "14,975 pts",
  exSec1Sec1SubtxtSrc = "EventSubtxt supporting content",
  exSec1Sec1AtrbNameSrc = "BrandName",
  exSec1Sec1RTxtSrc = "in {time}",
  exSec1Sec1ActClick = {},
  exSec1Sec1CellClick = {},
  secHead = true,
  secHeadTitleIcnSrc = "tie",
  secHeadTitleSrc = "Brand Ties",
  secHeadAct1TxtSrc = "See All",
  secHeadAct1Click = {},
  stats = true,
  stat4Src = "stat4",
  stat2 = true,
  stat3 = true,
  stat4 = false,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "tie-sec")}
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
        sz="m"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "sec-wrap")}
        tag="div"
        data-shadow="y"
      >
        <MediaHero
          atrbNameSrc={conHeroAtrbNameSrc}
          titleSrc={conHeroTitleSrc}
          subtxtSrc={conHeroSubtxtSrc}
          atrbTimeSrc={conHeroRTxtSrc}
          atrbAvtrSrc={conHeroAtrbVizSrc}
          vizImgSrc={conHeroVizSrc}
          vizImgAlt={conHeroVizAlt}
          vizVideoSrc={conHeroVideoSrc}
          atrbAvtrAlt={conHeroAtrbVizAlt}
          atrbBdg={conHeroAtrbBdg}
          atrbBdg1TxtSrc={conHeroAtrbBdg1TxtSrc}
          vizClick={conHeroVizClick}
          captClick={conHeroDetClick}
          actClick={conHeroActClick}
          vizVideo={conHeroVideo}
          subtxt={true}
          atrb={true}
          gttrBdg={false}
          isVid={false}
          isOffer={true}
          atrbAvtrShape="r"
          atrbAvtrSz="m"
        />
        <SecEvent
          sec={exSec1Sec1Sec}
          secHead={exSec1Sec1SecHead}
          conCellMap={conSec1Map}
          conExampleCell={conExampleSec1EvntCell}
          exampleVizSrc={exSec1Sec1VizSrc}
          exampleVizAlt={exSec1Sec1VizAlt}
          exampleTitleSrc={exSec1Sec1TitleSrc}
          exampleSubtxtSrc={exSec1Sec1SubtxtSrc}
          exampleCellClick={exSec1Sec1CellClick}
          exampleAtrbNameSrc={exSec1Sec1AtrbNameSrc}
          exampleRTxtSrc={exSec1Sec1RTxtSrc}
          exampleActClick={exSec1Sec1ActClick}
          emptyEmpty={false}
        />
        <SecActivity
          sec={exActvActvSec}
          secHead={exActvAcvSecHead}
          conListMap={conActvMap}
          conExampleListItm={conExampleActvItm}
          exampleVizSrc={exActvActvVizSrc}
          exampleVizAlt={exActvActvVizAlt}
          exampleTitleSrc={exActvActvTitleSrc}
          exampleSubtxtSrc={exActvActvSubtxtSrc}
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
          stat2={stat2}
          stat3={stat3}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
