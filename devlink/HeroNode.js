"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Hero } from "./Hero";
import { BarSs } from "./BarSs";
import * as _utils from "./utils";
import _styles from "./HeroNode.module.css";

export function HeroNode({
  as: _Component = _Builtin.Section,
  sec = true,
  conVizSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  conVizAlt = "__wf_reserved_inherit",
  conVizAsp = "72-9",
  conIcnBarL1Icn = true,
  conIcnBarR1Icn = true,
  conIcnBarL1Src = "Scan_qr",
  conIcnBarR1Src = "Moreh",
  conIcnBarL1Click = {},
  conIcnBarR1Click = {},
  conHlineSrc = "NodeTitle",
  conHlineSubtxt = false,
  conHlineSubtxtSrc = "Subhead description below",
  conSideScroll = true,
  conCellMap,
  conExampleCell = true,
}) {
  return sec ? (
    <_Component
      className={_utils.cx(_styles, "hero_wrap")}
      grid={{
        type: "section",
      }}
      tag="section"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "hero_main")}
        id={_utils.cx(
          _styles,
          "w-node-_20cef16f-b383-ed1b-94eb-d2d5cb79d57a-cb79d579"
        )}
        tag="div"
        data-shadow="y"
        data-obj-asp="72-9"
      >
        <Hero
          imgSrc={conVizSrc}
          hlineHlineSubtxt={conHlineSubtxt}
          heroAsp={conVizAsp}
          hlineHlineSrc={conHlineSrc}
          icnBarIcnBarL1Icn={conIcnBarL1Icn}
          imgAlt={conVizAlt}
          icnBarIcnBarR1Click={conIcnBarR1Click}
          hlineHlineSubtxtSrc={conHlineSubtxtSrc}
          icnBarIcnBarR1Icn={conIcnBarR1Icn}
          icnBarIcnBarL1Src={conIcnBarL1Src}
          icnBarIcnBarR1Src={conIcnBarR1Src}
          icnBarIcnBarL1Click={conIcnBarL1Click}
          hlineHlineSz="xl"
          hlineHlineAlign="l"
          fadeBtm={false}
          btn={false}
          btnBtnTxt={true}
          btnBtnIcn={false}
          btnBtnTxtSrc="Shop Now"
          btnBtnSz="l"
          icnBar={true}
          bnr={false}
          hlineHlineLoc="top5"
          img={true}
        />
        {conSideScroll ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "node-ss-wrap")}
            tag="div"
          >
            <BarSs
              barMap={conCellMap}
              example={conExampleCell}
              sideFade={false}
              exampleBreadcrumb={true}
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
