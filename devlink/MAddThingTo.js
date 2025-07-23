"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { List } from "./List";
import { ListItmCtrl } from "./ListItmCtrl";
import { Spacer } from "./Spacer";
import { InputWBtns } from "./InputWBtns";
import * as _utils from "./utils";
import _styles from "./MAddThingTo.module.css";

export function MAddThingTo({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  listMap,
  filterMap,
  fldOnChange,
  doClick = {},
  listItmExample = true,
  listItmClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "g-addto")} tag="div" id="Add-to">
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          sz="xl"
          titleSrc="Add to"
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <List listItmMap={listMap} exampleListItm={false} />
        <ListItmCtrl
          listItem={listItmExample}
          listItemClick={listItmClick}
          lLImg={true}
          pPTitleSrc="CollectionName"
          pPSubtxtSrc="privacy type"
          tTIcn={true}
          tTAct={false}
          tTSuprAct={false}
          tTIcnSrc="Checkfat"
          tTIcnClr="p500"
          tTIcnSz="m"
        />
        <Spacer szDep="64" size="64" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "dock-btm")}
        tag="div"
        data-bs="m"
      >
        <_Builtin.Block className={_utils.cx(_styles, "filter-list")} tag="div">
          {filterMap}
        </_Builtin.Block>
        <InputWBtns
          fldFldOnChange={fldOnChange}
          tTBtnClick={doClick}
          tTBtn={true}
          tTBtnStyle="pf"
          tTBtnTxt={true}
          tTBtnIcn={false}
          tTBtnTxtSrc="Done"
          lLBtn={false}
        />
        <Spacer size="16" />
      </_Builtin.Block>
    </_Component>
  );
}
