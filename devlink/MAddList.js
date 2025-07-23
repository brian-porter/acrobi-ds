"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { MenuAcrd } from "./MenuAcrd";
import { InputWBtns } from "./InputWBtns";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MAddList.module.css";

export function MAddList({
  as: _Component = _Builtin.Block,
  titleSrc = "New {Type}",
  cancelClick = {},
  acrdMap,
  exampleAcrd = false,
  privBtnClick = {},
  autoFocus,
  namePlaceholderSrc = "{Type} Name",
  nameOnChange,
  doBtnClick = {},
  btmShdw = "m",
}) {
  return (
    <_Component className={_utils.cx(_styles, "list-add_main")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          titleSrc={titleSrc}
          act1Click={cancelClick}
          sz="xl"
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <MenuAcrd acrdSecMap={acrdMap} acrd={exampleAcrd} />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "doc-btm")}
        tag="div"
        data-bs={btmShdw}
      >
        <InputWBtns
          fldFldOnChange={nameOnChange}
          tTBtnClick={doBtnClick}
          lLBtnClick={privBtnClick}
          fldFldPholdSrc={namePlaceholderSrc}
          lLBtnIcnSrc="lock_key"
          fldFldLIcnSrc="bookmark_folder"
          fldFldTBtnLink={{
            href: "#",
          }}
          tTBtn={true}
          fldFldTBtn={false}
          tTBtnStyle="pf"
          tTBtnTxtSrc="Create"
          tTBtnIcn={false}
          tTBtnTxt={true}
          fldFldLIcnDisp="l"
        />
        <Spacer size="16" />
      </_Builtin.Block>
    </_Component>
  );
}
