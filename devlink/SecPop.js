"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Spacer } from "./Spacer";
import { MediaItem } from "./MediaItem";
import * as _utils from "./utils";
import _styles from "./SecPop.module.css";

export function SecPop({
  as: _Component = _Builtin.Section,
  popMap,
  popExample = true,
  pop = true,
  slotId = "media-item",
}) {
  return pop ? (
    <_Component
      className={_utils.cx(_styles, "pop-sec")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <SecHead
        titleSrc="Popular"
        titleIcn={true}
        titleIcnSrc="hot"
        act1={false}
      />
      <Spacer szDep="24" size="24" />
      <_Builtin.Grid
        className={_utils.cx(_styles, "media-grid-aside")}
        tag="div"
        id={slotId}
      >
        {popMap ?? (
          <MediaItem
            mediaItem={popExample}
            atrbAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
            atrbAvtr2Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
            atrbAvtr3Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
            atrbAvtr4Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
            atrbAvtr5Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
            atrbName={true}
            titleLc="2"
            vizVideo={true}
            viz={false}
            vizValue={true}
            atrbNameSrc="ChannelName"
            atrb={true}
            titleSz="r4"
            atrbBdg1IcnSrc="view"
            titleSrc="Video Title goes here with line wrap to second line max really long line here to test the line wrap and truncate at the second"
          />
        )}
      </_Builtin.Grid>
    </_Component>
  ) : null;
}
