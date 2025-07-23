"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { List } from "./List";
import { ListItmCtrl } from "./ListItmCtrl";
import { InputWBtns } from "./InputWBtns";
import * as _utils from "./utils";
import _styles from "./MRoomNew.module.css";

export function MRoomNew({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  mbrMap,
  mbrItmExample = true,
  mbrAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  mbrAvtrAlt = "__wf_reserved_inherit",
  mbrAvtrBdgClr = "fd500",
  mbrTitleSrc = "FName LName",
  mbrRdioIcn = "circ_off",
  mbrRdioClr = "n300",
  mbrItmClick = {},
  toFldPholdSrc = "Placeholder",
  toFldOnChange,
  toFldClick = {},
  doClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "room_new")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          titleSrc="New Message"
          sz="l"
          titleSz="r1b"
          act1TxtSrc="Cancel"
          act1IcnSrc="Moreh"
          act1Txt={true}
          act1Icn={false}
          act2={false}
          act2Txt={true}
          act1={true}
          subtxtSrc="xx members"
          act1Styl="ft"
          subtxt={false}
          act2TxtSrc="Gallery"
          secHead={true}
          gttrBdgPin={false}
          gttrBdgAlarm={false}
          gttrBdgBkmrk={false}
          titleClick={{}}
          titleIcnSrc="Default"
          titleIcnSz="l"
          titleIcn={false}
          titleAvtr={false}
          titleAvtrSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif"
          titleAvtrAlt="__wf_reserved_inherit"
          titleAvtr2={false}
          titleAvtr3={false}
          titleAvtr2Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
          titleAvtr2Alt="__wf_reserved_inherit"
          titleAvtr3Src="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/663923c8ca66f55bef4ce1bb_avatar-empty.avif"
          titleAvtr3Alt="__wf_reserved_inherit"
          act2IcnSrc="gallery"
          act2Styl="ft"
          act2IcnLoc="r"
          act2Click={{}}
          subtxtClr="n700"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <List listItmMap={mbrMap} exampleListItm={false} />
        <ListItmCtrl
          pPTitleSrc={mbrTitleSrc}
          listItem={mbrItmExample}
          listItemClick={mbrItmClick}
          lLAvtrSrc={mbrAvtrSrc}
          lLAvtrAlt={mbrAvtrAlt}
          lLAvtrBdgClr={mbrAvtrBdgClr}
          tTRdioIcn={mbrRdioIcn}
          tTRdioClr={mbrRdioClr}
          lLAvtr={true}
          lLAvtrSz="s"
          lLAvtrBdg={true}
          lLAvtrBdgSz="sm"
          pPSubtxt={false}
          tTRdio={true}
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-footer")} tag="div">
        <InputWBtns
          fldFldClick={toFldClick}
          fldFldOnChange={toFldOnChange}
          fldFldPholdSrc={toFldPholdSrc}
          tTBtnClick={doClick}
          lLBtnTxt={true}
          lLBtnIcn={false}
          lLBtnTxtSrc="To:"
          fldFldLIcnSrc="member"
          fldFldTBtn={false}
          tTBtn={true}
          tTBtnIcnSrc="Send"
          tTBtnTxtSrc="Done"
          tTBtnTxt={true}
          tTBtnIcn={false}
          tTBtnStyle="pf"
        />
      </_Builtin.Block>
    </_Component>
  );
}
