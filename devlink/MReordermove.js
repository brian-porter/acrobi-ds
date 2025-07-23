"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { List } from "./List";
import { ListItmCtrl } from "./ListItmCtrl";
import { ButtonPanel } from "./ButtonPanel";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MReordermove.module.css";

export function MReordermove({
  as: _Component = _Builtin.Block,
  headTitleSrc = "Remove & Reorder",
  cancelClick = {},
  listMap,
  listItemNonExampleListItem = true,
  exampleRemove = true,
  exampleTitleSrc = "ItemName",
  exampleRemoveClick = {},
  exampleReorderClick = {},
  doBtnTxtSrc = "Done",
  doDisabled = "false",
  doClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-reorder-remove")}
      tag="div"
      id="Reorder"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          titleSrc={headTitleSrc}
          act1Click={cancelClick}
          sz="xl"
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <List listItmMap={listMap} exampleListItm={false} />
        <ListItmCtrl
          lLRdio={exampleRemove}
          pPTitleSrc={exampleTitleSrc}
          listItem={listItemNonExampleListItem}
          primeClick={exampleReorderClick}
          lLRdioClick={exampleRemoveClick}
          tTIcn={true}
          pPSubtxt={false}
          tTIcnSrc="order_grab"
          tTIcnSz="m"
          trailClick={{}}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "dock-btm")}
        tag="div"
        data-bs="m"
      >
        <ButtonPanel
          btn1TxtSrc={doBtnTxtSrc}
          btn1Click={doClick}
          btn1Disabled={doDisabled}
          btn3={false}
          btn2={false}
        />
        <Spacer size="16" />
      </_Builtin.Block>
    </_Component>
  );
}
