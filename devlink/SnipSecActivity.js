"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Post } from "./Post";
import { SecPosts } from "./SecPosts";
import { Spacer } from "./Spacer";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SnipSecActivity.module.css";

export function SnipSecActivity({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  secHeadTitleIcn = true,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "item_comm",
  secHeadTitleSrc = "Community",
  secHeadAct1TxtSrc = "See All",
  secHeadAct1Click = {},
  conSec1Map,
  conExampleSec1LatestPost = true,
  conSec2Map,
  conExampleSec2CellPastPost = true,
  exSec2Sec2VizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40335a66d94f9917bcf_product-generic.avif",
  exSec2Sec2VizAlt = "__wf_reserved_inherit",
  exSec2Sec2TitleSrc = "Description goes here with a wrap to a second line",
  exSec2Sec2CellClick = {},
  stat1Src = "13 posts",
  stat2Src = "232 likes",
  stat3Src = "28 comments",
  stat4Src = "4k views",
  stats = true,
  stat2 = true,
  stat3 = true,
  stat4 = true,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "activity-sec")}
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
        <SecHead
          titleSrc="Latest contribution"
          sz="s"
          act1TxtSrc="Edit"
          act1={false}
          titleClr="n500"
        />
        <_Builtin.Block className={_utils.cx(_styles, "post-latest")} tag="div">
          {conSec1Map ?? (
            <Post
              post={conExampleSec1LatestPost}
              header={true}
              hdrSubtxt={true}
              hdrImgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6695a40355983f7a1cb5854b_place-generic.avif"
              hdrTitleSrc="LocalShopName"
              hdrSubtxtSrc="5668 102nd Ave N, Brooklyn Park"
            />
          )}
        </_Builtin.Block>
        <SecPosts
          conCellMap={conSec2Map}
          conExampleCellPastPost={conExampleSec2CellPastPost}
          exampleVizSrc={exSec2Sec2VizSrc}
          exampleVizAlt={exSec2Sec2VizAlt}
          exampleTitleSrc={exSec2Sec2TitleSrc}
          exampleCellClick={exSec2Sec2CellClick}
          stat1Src={stat1Src}
          stat2Src={stat2Src}
          stat3Src={stat3Src}
          stat4Src={stat4Src}
          secHeadTitleSrc="Past posts"
        />
        <Spacer size="16" />
        <StatsBar
          stat1Src={stat1Src}
          stat2Src={stat2Src}
          stat3Src={stat3Src}
          stat4Src={stat4Src}
          stat4={stat4}
          stats={stats}
          stat2={stat2}
          stat3={stat3}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
