"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { List } from "./List";
import { ListItmCtrl } from "./ListItmCtrl";
import { ButtonPanel } from "./ButtonPanel";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MRoomAccess.module.css";

export function MRoomAccess({
  as: _Component = _Builtin.Block,
  act1TxtSrc = "Clear All",
  act1Click = {},
  listMap,
  listItmExample = true,
  doClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-room-access")}
      tag="section"
      data-mini=""
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1TxtSrc={act1TxtSrc}
          act1Click={act1Click}
          titleSrc="Room Access"
          sz="xl"
          act1={true}
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <List listItmMap={listMap} exampleListItm={false} />
        <ListItmCtrl
          listItem={listItmExample}
          lLIcn={true}
          lLIcnSz="m"
          pPTitleSrc="RoomName"
          pPSubtxt={false}
          tTRdio={true}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "a-footer")}
        tag="div"
        data-top-shadow="y"
      >
        <ButtonPanel
          btn1Click={doClick}
          btn2={false}
          btn3={false}
          btn1TxtSrc="Grant Access"
        />
        <Spacer size="16" />
      </_Builtin.Block>
    </_Component>
  );
}
