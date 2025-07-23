"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ListItmCtrl } from "./ListItmCtrl";
import { List } from "./List";
import { InputWBtns } from "./InputWBtns";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MGroupAdmin.module.css";

export function MGroupAdmin({
  as: _Component = _Builtin.Block,
  act1TxtSrc = "Clear All",
  act1Click = {},
  adminAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif",
  adminName = "Me",
  adminDesc = "@handle",
  adminMoreClick = {},
  listMap,
  listItmExample = true,
  searchClick = {},
  doClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-group-admin")}
      tag="section"
      mini=""
      id="Admin"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1TxtSrc={act1TxtSrc}
          act1Click={act1Click}
          titleSrc="Admin"
          sz="xl"
          act1={true}
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <ListItmCtrl
          pPTitleSrc={adminName}
          pPSubtxtSrc={adminDesc}
          trailClick={adminMoreClick}
          lLAvtr={true}
          tTAct={false}
          tTIcn={true}
        />
        <List listItmMap={listMap} exampleListItm={false} />
        <ListItmCtrl
          listItem={listItmExample}
          lLAvtr={true}
          pPTitleSrc="FName LName"
          pPSubtxtSrc="Rick Dandrow's friend"
          tTAct={false}
          tTIcn={false}
          trailClick={{}}
          tTRdio={true}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "a-footer")}
        tag="div"
        data-top-shadow="y"
      >
        <InputWBtns
          fldFldClick={searchClick}
          tTBtnClick={doClick}
          tTBtn={true}
          pPFld={true}
          lLBtnIcnSrc="Add"
          tTBtnTxt={true}
          tTBtnIcn={false}
          tTBtnTxtSrc="Grant"
          tTBtnIcnSrc="default"
          tTBtnStyle="pf"
          lLBtn={false}
          fldFldTBtn={false}
        />
        <Spacer size="16" />
      </_Builtin.Block>
    </_Component>
  );
}
