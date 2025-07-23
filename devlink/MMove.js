"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { List } from "./List";
import { ListItmCtrl } from "./ListItmCtrl";
import { SearchFilter } from "./SearchFilter";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MMove.module.css";

export function MMove({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  listMap,
  exampleListItm = true,
  filterMap,
  exampleFilterMap = true,
  lBtnClick = {},
  fldClick = {},
  fldOnChange,
  newBtnClick = {},
  btmShdw = "m",
}) {
  return (
    <_Component className={_utils.cx(_styles, "g-move")} tag="div" id="Move">
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          titleSrc="Move to"
          sz="xl"
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <List listItmMap={listMap} exampleListItm={false} />
        <ListItmCtrl
          listItem={exampleListItm}
          tTIcn={false}
          pPSubtxt={true}
          pPTitleSrc="CollectionName"
          tTIcnSrc="order_grab"
          tTIcnSz="m"
          pPSubtxtSrc="privacy type"
          lLImg={true}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "dock-btm")}
        tag="div"
        data-bs="m"
      >
        <SearchFilter
          filterMap={filterMap}
          exampleMap={exampleFilterMap}
          lBtnClick={lBtnClick}
          fldClick={fldClick}
          newBtnClick={newBtnClick}
          fldOnChange={fldOnChange}
          lBtnIcnSrc="scan_qr"
        />
        <Spacer size="16" />
      </_Builtin.Block>
    </_Component>
  );
}
