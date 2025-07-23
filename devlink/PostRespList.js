"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import { List } from "./List";
import { PostRespItem } from "./PostRespItem";
import { EmptyBar } from "./EmptyBar";
import * as _utils from "./utils";
import _styles from "./PostRespList.module.css";

export function PostRespList({
  as: _Component = _Builtin.Block,
  resp = true,
  respQty = "#",
  respName = "Responses",
  respList = true,
  respListMap,
  respItemExample = true,
  respEmpty = false,
  respEmptyIcnSrc = "quest_ans",
  respEmptyHlineSrc = "Have an Opinion?",
  respEmptySubTxtSrc = "Have more to add to this, or want to bring more clarity to the contents. Let the community know",
  respEmptyCtaTxtSrc = "Make a Comment",
  respEmptyClick = {},
  answerBtn = false,
  answerBtnClick = {},
}) {
  return resp ? (
    <_Component className={_utils.cx(_styles, "post-resp-list")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-71")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "post-resp-name")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "post-resp-qty")}
            tag="div"
          >
            {respQty}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "post-resp-title")}
            tag="div"
          >
            {respName}
          </_Builtin.Block>
        </_Builtin.Block>
        <Button
          btn={answerBtn}
          btnClick={answerBtnClick}
          btnSz="s"
          btnTxtSrc="Answer"
          btnStyl="ft"
          btnIcn={true}
          btnIcnLoc="r"
          btnIcnSrc=""
        />
      </_Builtin.Block>
      <List list={respList} listItmMap={respListMap} exampleListItm={false} />
      <PostRespItem
        respItm={respItemExample}
        atrbName="AttributorName"
        respComment={false}
        atrbRank="Rank"
      />
      <EmptyBar
        empty={respEmpty}
        click={respEmptyClick}
        hlineSrc={respEmptyHlineSrc}
        icnSrc={respEmptyIcnSrc}
        subTxtSrc={respEmptySubTxtSrc}
        ctaTxtSrc={respEmptyCtaTxtSrc}
      />
    </_Component>
  ) : null;
}
