"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { BarSs } from "./BarSs";
import { StatsBar } from "./StatsBar";
import * as _utils from "./utils";
import _styles from "./SecGroup.module.css";

export function SecGroup({
  as: _Component = _Builtin.Section,
  secHeadTitleIcn = false,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "group",
  secHeadTitleSrc = "Groups",
  secHeadAct1TxtSrc = "See All",
  secHeadAct1Click = {},
  conSideFade = false,
  conCellMap,
  exampleVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  exampleVizAlt = "__wf_reserved_inherit",
  exampleVizSz,
  exampleCellSz = "3xl",
  exampleBnrAvtr1Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  exampleBnrAvtr2Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  exampleBnrAvtr3Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  exampleBnrAvtr4Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  exampleBnrAvtr5Src = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  exampleBnrAvtr2 = true,
  exampleBnrAvtr3 = false,
  exampleBnrAvtr4 = false,
  exampleBnrAvtr5 = false,
  exampleQtySrc = "123",
  exampleCapt = true,
  exampleTitleSrc = "GroupName",
  exampleRow1Lc = "1",
  sec = true,
  secHead = true,
  stats = false,
  stat1Src = "stat1",
  stat2Src = "stat2",
  stat3Src = "stat3",
  stat4Src = "stat4",
  stat2 = true,
  stat3 = false,
  stat4 = false,
  emptyEmpty = false,
  emptyIcnSrc = "group",
  emptyHlineSrc = "Oops, You Need a Group",
  emptySubTxtSrc = "Use the link below to make one. Next time they'll show up here to choose from.",
  emptyCtaTxtSrc = "Create a Group",
  emptyEmptyClick = {},
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "group-sec")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        titleSrc={secHeadTitleSrc}
        act1={secHeadAct1}
        secHead={secHead}
        titleIcn={secHeadTitleIcn}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1Click={secHeadAct1Click}
        titleIcnSrc={secHeadTitleIcnSrc}
      />
      <BarSs
        barMap={conCellMap}
        sideFade={conSideFade}
        empty={emptyEmpty}
        emptyClick={emptyEmptyClick}
        emptyIcnSrc={emptyIcnSrc}
        emptyHlineSrc={emptyHlineSrc}
        emptySubTxtSrc={emptySubTxtSrc}
        emptyCtaTxtSrc={emptyCtaTxtSrc}
      />
      <StatsBar
        stats={stats}
        stat1Src={stat1Src}
        stat3={stat3}
        stat4={stat4}
        stat2Src={stat2Src}
        stat3Src={stat3Src}
        stat4Src={stat4Src}
        stat2={stat2}
      />
    </_Component>
  ) : null;
}
