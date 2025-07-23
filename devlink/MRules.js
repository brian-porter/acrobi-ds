"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { List } from "./List";
import { ListItmCtrl } from "./ListItmCtrl";
import { InputWBtns } from "./InputWBtns";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MRules.module.css";

export function MRules({
  as: _Component = _Builtin.Block,
  act1TxtSrc = "Select All",
  act1Click = {},
  listMap,
  listItmExample = true,
  add = true,
  addClick = {},
  doClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-rules")}
      tag="section"
      data-mini=""
      id="Roles"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1TxtSrc={act1TxtSrc}
          act1Click={act1Click}
          titleSrc="Rules"
          sz="xl"
          act1={true}
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <List listItmMap={listMap} exampleListItm={false} />
        <ListItmCtrl
          listItem={listItmExample}
          lLIcn={false}
          pPTitleSrc="RuleName"
          pPSubtxtSrc="description of the rule here"
          tTTogl={true}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "a-footer")}
        tag="div"
        data-top-shadow="y"
      >
        <InputWBtns
          lLBtn={add}
          lLBtnClick={addClick}
          tTBtnClick={doClick}
          tTBtn={true}
          pPFld={false}
          lLBtnIcnSrc="Add"
          tTBtnTxt={true}
          tTBtnIcn={false}
          tTBtnTxtSrc="Done"
          tTBtnIcnSrc="default"
          tTBtnStyle="pf"
        />
        <Spacer size="16" />
      </_Builtin.Block>
    </_Component>
  );
}
