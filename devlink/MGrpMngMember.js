"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { EmptyCollection } from "./EmptyCollection";
import { MenuAcrd } from "./MenuAcrd";
import { InputWBtns } from "./InputWBtns";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MGrpMngMember.module.css";

export function MGrpMngMember({
  as: _Component = _Builtin.Block,
  mMCancelClick = {},
  mMEmptyInviteClick = {},
  mMEmpty = true,
  mMAcrd = false,
  mMAcrdSecMap,
  mMAddClick = {},
  mMSearchClick = {},
  mMSearchChange,
  mMAssignClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "grp-mng-mbr_main")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={mMCancelClick}
          titleSrc="Group Members"
          sz="xl"
          act1TxtSrc="Cancel"
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <EmptyCollection
          primeBtnClick={mMEmptyInviteClick}
          empty={mMEmpty}
          icnSrc="peep_add"
          headlineSrc="Let's Add Some Peeps"
          subtxtSrc="Put the word out with an invite to join. Once they accept your invite they'll show up here."
          primeBtnTxtSrc="Send Invites"
          primeBtnStyl="ft"
        />
        <MenuAcrd acrd={mMAcrd} acrdSecMap={mMAcrdSecMap} />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "a-footer")}
        tag="div"
        data-top-shadow="y"
      >
        <InputWBtns
          lLBtnClick={mMAddClick}
          fldFldClick={mMSearchClick}
          fldFldOnChange={mMSearchChange}
          tTBtnClick={mMAssignClick}
          tTBtn={true}
          tTBtnPad="n"
          tTBtnIcnSrc="peep_role"
          tTBtnTxtSrc="Role"
          lLBtnIcnSrc="Add"
          fldFldLIcnSrc="peep_search"
          fldFldTBtn={false}
          fldFldPholdSrc="Search members"
        />
        <Spacer size="0" />
      </_Builtin.Block>
    </_Component>
  );
}
