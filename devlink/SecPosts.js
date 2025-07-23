"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { BarSs } from "./BarSs";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SecPosts.module.css";

export function SecPosts({
  as: _Component = _Builtin.Section,
  secHeadTitleIcn = false,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "default",
  secHeadTitleSrc = "Posts",
  secHeadAct1TxtSrc = "See All",
  secHeadAct1Click = {},
  conSideFade = false,
  conCellMap,
  conExampleCellPastPost = true,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleTitleSrc = "Description goes here with a wrap to a second line",
  exampleCellClick = {},
  stat1Src = "13 posts",
  stat2Src = "232 likes",
  stat3Src = "28 comments",
  stat4Src = "4k views",
  sec = true,
  secHead = true,
  stat2 = true,
  stat3 = true,
  stat4 = true,
  stats = false,
  emptyEmpty = false,
  emptyEmptyIcnSrc = "notes",
  emptyEmptyHlineSrc = "No Posts Found",
  emptyEmptySubTxtSrc = "Ask them for a post",
  emptyEmptyCtaTxtSrc = "Send Request",
  emptyEmptyClick = {},
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "post-sec")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        titleSrc={secHeadTitleSrc}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1={secHeadAct1}
        secHead={secHead}
        titleIcn={secHeadTitleIcn}
        titleIcnSrc={secHeadTitleIcnSrc}
        act1Click={secHeadAct1Click}
        sz="s"
        titleClr="n500"
      />
      <BarSs
        empty={emptyEmpty}
        emptyHlineSrc={emptyEmptyHlineSrc}
        emptySubTxtSrc={emptyEmptySubTxtSrc}
        emptyCtaTxtSrc={emptyEmptyCtaTxtSrc}
        emptyIcnSrc={emptyEmptyIcnSrc}
        barMap={conCellMap}
        sideFade={conSideFade}
        emptyClick={emptyEmptyClick}
      />
      <StatsBar
        stat1Src={stat1Src}
        stat2Src={stat2Src}
        stat3Src={stat3Src}
        stat4Src={stat4Src}
        stat4={stat4}
        stat2={stat2}
        stat3={stat3}
        stats={stats}
      />
    </_Component>
  ) : null;
}
