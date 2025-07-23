"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { MediaHero } from "./MediaHero";
import { Spacer } from "./Spacer";
import { ItmSecCta } from "./ItmSecCta";
import { InputWBtns } from "./InputWBtns";
import { MediaItem } from "./MediaItem";
import { SecPop } from "./SecPop";
import { SecPeep } from "./SecPeep";
import * as _utils from "./utils";
import _styles from "./PItemVid.module.css";

export function PItemVid({
  as: _Component = _Builtin.Block,
  heroGttrPin = false,
  heroGttrBkmrk = false,

  heroVideoSrc = {
    width: 940,
    height: 528,
    title: "video placeholder",
    url: "//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FNpEaa2P7qZI%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DNpEaa2P7qZI&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FNpEaa2P7qZI%2Fhqdefault.jpg&type=text%2Fhtml&schema=youtube",
  },

  heroTitle = "Video Title here with truncation at one line",
  heroAvtr = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  heroAvtrAlt = "__wf_reserved_inherit",
  heroName = "ChannelName",
  heroView = "1.2m",
  heroVizValueSrc = "00:00",
  heroTime = "2d",
  heroClick = {},
  heroMoreClick = {},
  vidAddClick = {},
  scanBtn = false,
  scanBtnClick = {},
  searchClick = {},
  searchChange,
  fltrBtn = false,
  fltrClick = {},
  postMap,
  postExample = true,
  pop = true,
  popMap,
  popExample = true,
  peep = true,
  peepMap,
  peepExample = true,
  peepStat1Src = "3 connections",
  peepStat2Src = "24 community",
  slotId = "media-item",
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="div">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-60-40", "cc-top")}
          id={_utils.cx(
            _styles,
            "w-node-_72f5dcc8-c87c-9e34-62a8-3854e1577ddf-145b9709"
          )}
        >
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_72f5dcc8-c87c-9e34-62a8-3854e1577de0-145b9709"
            )}
          >
            <MediaHero
              atrbNameSrc={heroName}
              vizVideoSrc={heroVideoSrc}
              gttrPin={heroGttrPin}
              gttrBkmrk={heroGttrBkmrk}
              titleSrc={heroTitle}
              atrbAvtrSrc={heroAvtr}
              atrbBdg1TxtSrc={heroView}
              atrbTimeSrc={heroTime}
              actClick={heroMoreClick}
              vizClick={heroClick}
              atrbAvtrAlt={heroAvtrAlt}
              vizValueSrc={heroVizValueSrc}
              vizVideo={true}
              viz={true}
              vizValue={true}
            />
            <Spacer szDep="32" size="32" />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_72f5dcc8-c87c-9e34-62a8-3854e1577de4-145b9709"
            )}
          >
            <ItmSecCta
              btnClick={vidAddClick}
              eyebrowSrc="learn from the community"
              header="Videos"
              btnIcnSrc="Link"
              btnTxtSrc="Share"
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_72f5dcc8-c87c-9e34-62a8-3854e1577ded-145b9709"
            )}
          >
            <InputWBtns
              tTBtnIcnSrc="act_filter"
              fldFldTBtn={false}
              tTBtnPad="n"
              lLBtn={false}
              tTBtn={false}
              lLBtnClick={{}}
              fldFldClick={{}}
              fldFldOnChange=""
              tTBtnClick={{}}
            />
            <Spacer size="16" />
            <_Builtin.Grid
              className={_utils.cx(_styles, "obj-grid")}
              tag="div"
              id={slotId}
            >
              {postMap ?? (
                <MediaItem
                  mediaItem={postExample}
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
                  titleSz="r3"
                  atrbBdg1IcnSrc="view"
                  titleSrc="Video Title goes here with line wrap to second line max really long line here to test the line wrap and truncate at the second"
                />
              )}
            </_Builtin.Grid>
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_72f5dcc8-c87c-9e34-62a8-3854e1577e2d-145b9709"
            )}
          >
            <SecPop popMap={popMap} popExample={popExample} pop={pop} />
            <SecPeep
              sec={peep}
              conCellMap={peepMap}
              conExampleCell={peepExample}
              stat1Src={peepStat1Src}
              stat2Src={peepStat2Src}
              secHeadTitleIcnSrc="businessman"
              secHeadTitleSrc="Leaders"
              exampleBtn={false}
              exampleCaptSubtxt={false}
              exampleTitleSrc="FName LI"
            />
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
