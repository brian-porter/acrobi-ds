"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { MediaHero } from "./MediaHero";
import { SecList } from "./SecList";
import { SecActivity } from "./SecActivity";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SnipSecList.module.css";

export function SnipSecList({
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
    title: "video placeholder",
    url: "//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FNpEaa2P7qZI%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DNpEaa2P7qZI&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FNpEaa2P7qZI%2Fhqdefault.jpg&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=youtube",
  },

  conHeroVizClick = {},
  conHeroTitleSrc = "ListName goes here",
  conHeroAtrbNameSrc = "AtrbName",
  conHeroAtrbVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  conHeroAtrbVizAlt = "__wf_reserved_inherit",
  conHeroRTxtSrc = "2d",
  conHeroDetClick = {},
  conHeroActClick = {},
  conSec1Map,
  conExampleSec1Soon = true,
  conActvMap,
  conExampleActvItm = true,
  exSec1Sec1Sec = true,
  exSec1Sec1SecHead = true,
  exSec1Sec1VizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exSec1Sec1VizAlt = "__wf_reserved_inherit",
  exSec1Sec1TitleSrc = "Name",
  exSec1Sec1CellClick = {},
  secHeadTitleIcnSrc = "list",
  secHeadTitleSrc = "Lists",
  secHeadAct1TxtSrc = "See All",
  secHeadAct1Click = {},
  secHead = true,
  stats = true,
  exActvActvSec = true,
  exActvActvSecHead = true,
  exActvActvVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exActvActvVizAlt = "__wf_reserved_inherit",
  exActvActvTitleSrc = "{ItemName}",
  exActvActvSubtxtSrc = "{ListType}",
  exActvActvRTxtSrc = "{time}",
  exActvActvAct = true,
  exActvActvActClick = {},
  exActvActvCellClick = {},
  stat1Src = "{XX} lists",
  stat2Src = "{XX} items",
  stat3Src = "{XX} peeps",
  stat4Src = "stat4",
  stat2 = true,
  stat3 = false,
  stat4 = false,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "list-sec")}
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
          vizVideoSrc={conHeroVideoSrc}
          atrbAvtrSrc={conHeroAtrbVizSrc}
          actClick={conHeroActClick}
          captClick={conHeroDetClick}
          atrbTimeSrc={conHeroRTxtSrc}
          atrbAvtrAlt={conHeroAtrbVizAlt}
          vizClick={conHeroVizClick}
          vizImgSrc={conHeroVizSrc}
          vizImgAlt={conHeroVizAlt}
          vizVideo={conHeroVideo}
          atrbNameSrc={conHeroAtrbNameSrc}
          gttrBdg={false}
          subtxtSrc="ListType"
          isList={true}
          isVid={false}
        />
        <SecList
          conCellMap={conSec1Map}
          conCellExample={conExampleSec1Soon}
          exampleVizSrc={exSec1Sec1VizSrc}
          exampleVizAlt={exSec1Sec1VizAlt}
          exampleTitleSrc={exSec1Sec1TitleSrc}
          exampleCellClick={exSec1Sec1CellClick}
          secHead={exSec1Sec1SecHead}
          sec={exSec1Sec1Sec}
          secHeadTitleSrc="Happening Soon"
        />
        <SecActivity
          conListMap={conActvMap}
          exampleTitleSrc={exActvActvTitleSrc}
          exampleVizSrc={exActvActvVizSrc}
          exampleSubtxtSrc={exActvActvSubtxtSrc}
          exampleCellClick={exActvActvCellClick}
          exampleTimeSrc={exActvActvRTxtSrc}
          conExampleListItm={conExampleActvItm}
          exampleVizAlt={exActvActvVizAlt}
          exampleActClick={exActvActvActClick}
          exampleAct={exActvActvAct}
          secHead={exActvActvSecHead}
          sec={exActvActvSec}
        />
        <StatsBar
          stat1Src={stat1Src}
          stat2Src={stat2Src}
          stat3Src={stat3Src}
          stat4={stat4}
          stats={stats}
          stat3={stat3}
          stat4Src={stat4Src}
          stat2={stat2}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
