"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { EmptyCollection } from "./EmptyCollection";
import { MenuAcrd } from "./MenuAcrd";
import { InputWBtns } from "./InputWBtns";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MGrpMngRooms.module.css";

export function MGrpMngRooms({
  as: _Component = _Builtin.Block,
  rRCancelClick = {},
  rREmpty = true,
  rREmptyAddClick = {},
  rRAcrdSecMap,
  rRAcrd = true,
  rRAcrdSecIcn = "default",
  rRAcrdSecName = "SectionName",
  rRAcrdSecClick = {},
  rRAcrdSecSubMap,
  rRAddClick = {},
  rRSearchClick = {},
  rRSearchChange,
  rRSectionClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "grp-mng-room_main")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={rRCancelClick}
          titleSrc="Rooms"
          sz="xl"
          act1TxtSrc="Cancel"
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <EmptyCollection
          empty={rREmpty}
          primeBtnClick={rREmptyAddClick}
          icnSrc="rooms"
          headlineSrc="Start A Conversation"
          subtxtSrc="Create a room around a subject or to just hang out, send messages, opinions, images, and polls."
          primeBtnTxtSrc="Create Room"
          primeBtnStyl="ft"
        />
        <MenuAcrd acrdSecMap={rRAcrdSecMap} acrd={rRAcrd} />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "a-footer")}
        tag="div"
        data-top-shadow="y"
      >
        <InputWBtns
          lLBtnClick={rRAddClick}
          fldFldClick={rRSearchClick}
          fldFldOnChange={rRSearchChange}
          tTBtnClick={rRSectionClick}
          tTBtn={true}
          tTBtnPad="n"
          tTBtnIcnSrc="peep_sec"
          tTBtnTxtSrc="Section"
          lLBtnIcnSrc="Add"
          fldFldLIcnSrc="Search"
          fldFldTBtn={false}
          fldFldPholdSrc="Search rooms"
        />
        <Spacer size="0" />
      </_Builtin.Block>
    </_Component>
  );
}
