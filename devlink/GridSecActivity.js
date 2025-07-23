"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { CardPeepData } from "./CardPeepData";
import { EmptyCollection } from "./EmptyCollection";
import * as _utils from "./utils";
import _styles from "./GridSecActivity.module.css";

export function GridSecActivity({
  as: _Component = _Builtin.Section,
  sec = true,
  secHead = true,
  secHeadTitleIcn = true,
  secHeadAct1 = false,
  secHeadTitleIcnSrc = "flash_on",
  secHeadTitleSrc = "Activity",
  secHeadAct1TxtSrc = "See All",
  secHeadAct1Click = {},
  conCellMap,
  conExampleCell = true,
  emptyEmpty = false,
  emptyPrimeBtnClick = {},
  emptySecBtnClick = {},
  emptyTirBtnClick = {},
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
        titleSrc={secHeadTitleSrc}
        titleIcn={secHeadTitleIcn}
        act1={secHeadAct1}
        titleIcnSrc={secHeadTitleIcnSrc}
        secHead={secHead}
        act1TxtSrc={secHeadAct1TxtSrc}
        act1Click={secHeadAct1Click}
      />
      <_Builtin.Grid
        className={_utils.cx(_styles, "grid-peep-act")}
        tag="div"
        id="obj-data"
      >
        {conCellMap ??
          (conExampleCell ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "example-cell")}
              id={_utils.cx(
                _styles,
                "w-node-_61f146bb-3b6e-226f-8628-08ea5cf42727-5cf42720"
              )}
              tag="div"
            >
              <CardPeepData />
            </_Builtin.Block>
          ) : null)}
      </_Builtin.Grid>
      <EmptyCollection
        empty={emptyEmpty}
        primeBtnClick={emptyPrimeBtnClick}
        secBtnClick={emptySecBtnClick}
        tirBtnClick={emptyTirBtnClick}
        icnSrc="member"
        headlineSrc="No Activity Here"
        subtxtSrc="Use these links to connect with other people, groups and brands. Next time their recent activities will show up here."
        primeBtnTxtSrc="Find Friends"
        secBtn={true}
        secBtnTxtSrc="Join a Group"
        tirBtnTxtSrc="Connect to Brands"
        tirBtn={true}
        btmDoc={true}
        primeBtnStyl="pf"
      />
    </_Component>
  ) : null;
}
