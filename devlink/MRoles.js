"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ListItmCtrl } from "./ListItmCtrl";
import { List } from "./List";
import { InputWBtns } from "./InputWBtns";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MRoles.module.css";

export function MRoles({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  listMap,
  listItmExample = true,
  addClick = {},
  doBtnClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-roles")}
      tag="section"
      mini=""
      id="Roles"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          titleSrc="Group Roles"
          sz="xl"
          act1={true}
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <ListItmCtrl
          listItem={listItmExample}
          lLIcn={true}
          pPTitleSrc="RoleName"
          pPSubtxtSrc="description of the role here"
        />
        <List listItmMap={listMap} exampleListItm={false} />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "a-footer")}
        tag="div"
        data-top-shadow="y"
      >
        <InputWBtns
          lLBtnClick={addClick}
          tTBtnClick={doBtnClick}
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
