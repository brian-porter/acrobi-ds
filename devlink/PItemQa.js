"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ItemHead } from "./ItemHead";
import { Spacer } from "./Spacer";
import { ItmSecCta } from "./ItmSecCta";
import { InputWBtns } from "./InputWBtns";
import { List } from "./List";
import { Post } from "./Post";
import { SecHead } from "./SecHead";
import { Cell } from "./Cell";
import { SecPeep } from "./SecPeep";
import * as _utils from "./utils";
import _styles from "./PItemQa.module.css";

export function PItemQa({
  as: _Component = _Builtin.Block,
  itmImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  itmImgAlt = "__wf_reserved_inherit",
  itmName = "ItemName description goes here andline wraps",
  askClick = {},
  scanBtn = false,
  scanBtnClick = {},
  searchClick = {},
  searchChange,
  fltrBtn = false,
  fltrBtnClick = {},
  postMap,
  postExample = true,
  mediaAllClick = {},
  mediaMap,
  slotId = "image-grid",
  mediaExample = true,
  peep = true,
  peepMap,
  peepExample = true,
  peepStat1Src = "3 connections",
  peepStat2Src = "24 community",
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "page_main")} tag="div">
        <_Builtin.Layout
          className={_utils.cx(_styles, "qs-60-40")}
          id={_utils.cx(
            _styles,
            "w-node-_5407fcd6-1248-ec92-246f-bce95e37ac63-ca8d0669"
          )}
        >
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_5407fcd6-1248-ec92-246f-bce95e37ac64-ca8d0669"
            )}
          >
            <ItemHead
              itmImgSrc={itmImgSrc}
              itmImgAlt={itmImgAlt}
              name={itmName}
            />
            <Spacer szDep="32" size="32" />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_5407fcd6-1248-ec92-246f-bce95e37ac6c-ca8d0669"
            )}
          >
            <ItmSecCta
              btnClick={askClick}
              desc="Have a question about this item? Let those in the community that have experience with it answer your questions."
              header="Q&A"
              eyebrowSrc="ask and be answered"
              btnTxtSrc="Ask"
              btnIcnSrc="Quest_ans"
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_5407fcd6-1248-ec92-246f-bce95e37ac74-ca8d0669"
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
            <List listItmMap={postMap} exampleListItm={false} />
            <Post
              post={postExample}
              titleSrc="The headline title for the question being asked goes here and line wraps?"
              bodySrc={
                <>
                  {
                    "The body of the question goes in this location with any media attachments below text copy. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
                  }
                  <br />
                  <br />
                  {
                    "Body of the post goes in this location with any media attachments below text copy. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere."
                  }
                </>
              }
              respName="Responses"
              title={true}
              rank={true}
              respItemExample={false}
              respEmpty={true}
              media={false}
              bodyAcrd={false}
              act={true}
              respEmptyHlineSrc="Do You Know?"
              respEmptyCtaTxtSrc="Answer It"
              respEmptySubTxtSrc="Help this person and the community by answering the question. Give the best answer to be featured."
            />
          </_Builtin.Cell>
          <_Builtin.Cell
            id={_utils.cx(
              _styles,
              "w-node-_5407fcd6-1248-ec92-246f-bce95e37ac7d-ca8d0669"
            )}
          >
            <SecHead
              act1Click={mediaAllClick}
              titleSrc="Media from answers"
              titleIcn={true}
              titleIcnSrc="ed_img"
              act1TxtSrc="See All"
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
