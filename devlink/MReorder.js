"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { List } from "./List";
import { ListItmCtrl } from "./ListItmCtrl";
import { ButtonPanel } from "./ButtonPanel";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MReorder.module.css";

export function MReorder({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  listMap,
  exampleListItm = true,
  doClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-reorder")}
      tag="div"
      id="Reorder"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          sz="xl"
          titleSrc="Reorder"
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <List listItmMap={listMap} exampleListItm={false} />
        <ListItmCtrl
          listItem={exampleListItm}
          tTIcn={true}
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
        <ButtonPanel
          btn1Click={doClick}
          btn1TxtSrc="Done"
          btn3={false}
          btn2={false}
        />
        <Spacer size="16" />
      </_Builtin.Block>
    </_Component>
  );
}
