"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ItemHead } from "./ItemHead";
import { RatingHero } from "./RatingHero";
import { Spacer } from "./Spacer";
import { ItmSecCta } from "./ItmSecCta";
import { InputWBtns } from "./InputWBtns";
import { List } from "./List";
import { Post } from "./Post";
import { SecHead } from "./SecHead";
import { Cell } from "./Cell";
import { SecPeep } from "./SecPeep";
import * as _utils from "./utils";
import _styles from "./PItemRev.module.css";

export function PItemRev({
  as: _Component = _Builtin.Block,
  itmImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  itmImgAlt = "__wf_reserved_inherit",
  itmName = "ItemName description goes here andline wraps",
  rateAvgValue = "4.6",
  rateQty = "3456",
  rateBar1Qty = {},
  rateBar2Qty = {},
  rateBar3Qty = {},
  rateBar4Qty = {},
  rateBar5Qty = {},
  rateBar1Click = {},
  rateBar2Click = {},
  rateBar3Click = {},
  rateBar4Click = {},
  rateBar5Click = {},
  giveClick = {},
  scanBtn = false,
  scanBtnClick = {},
  searchClick = {},
  searchChange,
  fltrBtn = false,
  fltrClick = {},
  postMap,
  postExample = true,
  mediaAllClick = {},
  mediaMap,
  mediaExample = true,
  peep = true,
  peepMap,
  peepExample = true,
  peepStat1Src = "3 connections",
  peepStat2Src = "24 community",
  slotId = "image-grid",
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="main">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-60-40")}
          id={_utils.cx(
            _styles,
            "w-node-_0b1d4bc5-d88b-4596-5ebd-4f6e9a0a62f6-e07ac151"
          )}
        >
          <_Builtin.Cell
            className={_utils.cx(_styles, "cell")}
            id={_utils.cx(
              _styles,
              "w-node-_0b1d4bc5-d88b-4596-5ebd-4f6e9a0a62f7-e07ac151"
            )}
          >
            <ItemHead
              itmImgSrc={itmImgSrc}
              itmImgAlt={itmImgAlt}
              name={itmName}
            />
            <RatingHero
              rateAvgValue={rateAvgValue}
              rateQty={rateQty}
              bar1Qty={rateBar1Qty}
              bar2Qty={rateBar2Qty}
              bar3Qty={rateBar3Qty}
              bar4Qty={rateBar4Qty}
              bar5Qty={rateBar5Qty}
              bar1Click={rateBar1Click}
              bar2Click={rateBar2Click}
              bar3Click={rateBar3Click}
              bar4Click={rateBar4Click}
              bar5Click={rateBar5Click}
            />
            <Spacer szDep="32" size="32" />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_0b1d4bc5-d88b-4596-5ebd-4f6e9a0a62fb-e07ac151"
            )}
          >
            <ItmSecCta
              btnClick={giveClick}
              desc="Give the community your honest opinion on your experience with this product, to help others with their evaluations."
              header="Reviews"
              eyebrowSrc="share your experiences"
              btnTxtSrc="Give"
              btnIcnSrc="Star_plus"
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_0b1d4bc5-d88b-4596-5ebd-4f6e9a0a6304-e07ac151"
            )}
          >
            <InputWBtns
              lLBtn={scanBtn}
              tTBtn={fltrBtn}
              lLBtnClick={scanBtnClick}
              fldFldClick={searchClick}
              fldFldOnChange={searchChange}
              tTBtnClick={fltrClick}
              tTBtnIcnSrc="act_filter"
              fldFldTBtn={false}
              tTBtnPad="n"
            />
            <Spacer size="16" />
            <List listItmMap={postMap} exampleListItm={false} />
            <Post
              post={postExample}
              respName="Comments"
              rating={true}
              rank={true}
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_0b1d4bc5-d88b-4596-5ebd-4f6e9a0a6313-e07ac151"
            )}
          >
            <SecHead
              act1Click={mediaAllClick}
              titleSrc="Media from reviews"
              titleIcn={true}
              titleIcnSrc="ed_img"
              act1TxtSrc="See All"
              sz=""
              titleSz="r1"
            />
            <_Builtin.Grid
              className={_utils.cx(_styles, "media-grid")}
              tag="div"
              id={slotId}
            >
              {mediaMap ?? <Cell cell={mediaExample} imgImgShape="b" />}
            </_Builtin.Grid>
            <SecPeep
              sec={peep}
              conCellMap={peepMap}
              conExampleCell={peepExample}
              stat1Src={peepStat1Src}
              stat2Src={peepStat2Src}
              exampleBtn={false}
              exampleCaptSubtxt={false}
              exampleTitleSrc="FName"
              secHeadAct1Click={{}}
              secHeadAct1TxtSrc="See All"
              exampleVizSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
            />
          </_Builtin.Cell>
        </_Builtin.Layout>
      </_Builtin.Block>
    </_Component>
  );
}
