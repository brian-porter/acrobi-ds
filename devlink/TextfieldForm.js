"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FieldLabel } from "./FieldLabel";
import { TextfieldCtrl } from "./TextfieldCtrl";
import { FieldHelper } from "./FieldHelper";
import * as _utils from "./utils";
import _styles from "./TextfieldForm.module.css";

export function TextfieldForm({
  as: _Component = _Builtin.Block,
  fld = true,
  lblTop = true,
  lblTopLblSrc = "Label",
  lblTopLblFor = "FldName",
  fldHelp = false,
  fieldFldIcn = false,
  fieldFldBtn = false,
  fieldFldIcnSrc = "Search",
  fieldFldIcnDisp = "n",
  fieldFldBtnIcnSrc = "mic",
  fieldFldBtnIcnAlt = "Microphone",
  fieldFldBrdClr,
  fieldFldPlaceholderSrc = "placeholder",
  fieldFldId = "FldId",
  fieldFldName,
  fieldFldType,
  fieldRequired = "false",
  fieldAutoComp = "off",
  fieldTabOrder,
  fieldAutoFocus,
  fieldReadOnly,
  fieldOnChange,

  fieldFldBtnLink = {
    href: "#",
  },

  fieldFldClick = {},
  fieldFldBtnClick = {},
  fldHelpHelpL = true,
  fldHelpHelpR = false,
  fldHelpHelpLSrc = "helper copy",
  fldHelpHelpRSrc = "0/200",
  fldHelpHelpShdw,
  fbk = false,
  fbkFbkTxt = true,
  fbkFbkIcn = false,
  fbkFbkTxtSrc = "Feedback here",
  fbkFbkIcnSrc = "check_circle",
  fbkFbkClr = "fd500",
  lblTopLblSz = "r4",
  lblTopLblClr = "n900",
  lblTopLblShdw,
  lblTopOpt = false,
  lblTopOptSrc = "label right",
  lblTopOptSz = "r4",
  lblTopOptClr = "n300",
}) {
  return fld ? (
    <_Component className={_utils.cx(_styles, "form_itm_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "form_main")} tag="div">
        <FieldLabel
          fldLblTop={lblTop}
          lblSrc={lblTopLblSrc}
          optSrc={lblTopOptSrc}
          opt={lblTopOpt}
          lblFor={lblTopLblFor}
          lblShdw={lblTopLblShdw}
          lblSz={lblTopLblSz}
          lblClr={lblTopLblClr}
          optSz={lblTopOptSz}
          optClr={lblTopOptClr}
        />
        <TextfieldCtrl
          fldBtn={fieldFldBtn}
          tabOrder={fieldTabOrder}
          fldIcn={fieldFldIcn}
          fldIcnSrc={fieldFldIcnSrc}
          fldIcnDisp={fieldFldIcnDisp}
          fldBtnIcnSrc={fieldFldBtnIcnSrc}
          fbk={fbk}
          fldBrdClr={fieldFldBrdClr}
          fbkFbkTxt={fbkFbkTxt}
          fbkFbkIcn={fbkFbkIcn}
          fbkFbkTxtSrc={fbkFbkTxtSrc}
          fbkFbkIcnSrc={fbkFbkIcnSrc}
          fbkFbkClr={fbkFbkClr}
          fldClick={fieldFldClick}
          onChange={fieldOnChange}
          fldPholdSrcX={fieldFldPlaceholderSrc}
          autoComp={fieldAutoComp}
          fldId={fieldFldId}
          fldBtnClick={fieldFldBtnClick}
          readOnly={fieldReadOnly}
          autoFocus={fieldAutoFocus}
          inpType={fieldFldType}
          fldBtnIcnAlt={fieldFldBtnIcnAlt}
          fldTxt={true}
        />
        <FieldHelper
          fldHelp={fldHelp}
          helpLSrc={fldHelpHelpLSrc}
          helpRSrc={fldHelpHelpRSrc}
          helpR={fldHelpHelpR}
          helpL={fldHelpHelpL}
          helpShdw={fldHelpHelpShdw}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
