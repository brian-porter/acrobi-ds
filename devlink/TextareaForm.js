"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FieldLabel } from "./FieldLabel";
import { TextareaCtrl } from "./TextareaCtrl";
import { FieldHelper } from "./FieldHelper";
import * as _utils from "./utils";
import _styles from "./TextareaForm.module.css";

export function TextareaForm({
  as: _Component = _Builtin.Block,
  fld = true,
  lblTop = true,
  lblTopLblSrc = "Label",
  lblTopLblFor,
  lblTopLblSz = "r4",
  lblTopLblClr = "n900",
  lblTopLblShdw,
  lblTopOpt = false,
  lblTopOptSrc = "required",
  lblTopOptSz = "r4",
  lblTopOptClr = "n300",
  fldHelp = false,
  fieldFldId,
  fieldFldName,
  fieldFldPholdSrc = "Placeholder",
  fieldFldBrdClr,
  fieldFldHeight,
  fieldTabOrder,
  fieldOnChange,
  fieldFldClick = {},
  fldHelpHelpL = true,
  fldHelpHelpR = false,
  fldHelpHelpLSrc = "helper copy",
  fldHelpHelpRSrc = "0/200",
  fldHelpHelpShdw,
  fbk = false,
  fbkFbkTxt = true,
  fbkFbkIcn = false,
  fbkFbkTxtSrc = "Feedback text",
  fbkFbkIcnSrc = "act_check_circle",
  fbkFbkClr = "fd500",
}) {
  return fld ? (
    <_Component className={_utils.cx(_styles, "form_itm_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "form_main")} tag="div">
        <FieldLabel
          fldLblTop={lblTop}
          optSrc={lblTopOptSrc}
          opt={lblTopOpt}
          lblSrc={lblTopLblSrc}
          lblFor={lblTopLblFor}
          lblSz={lblTopLblSz}
          lblClr={lblTopLblClr}
          lblShdw={lblTopLblShdw}
          optSz={lblTopOptSz}
          optClr={lblTopOptClr}
        />
        <TextareaCtrl
          tabOrder={fieldTabOrder}
          fldId={fieldFldId}
          fldBrdClr={fieldFldBrdClr}
          fbk={fbk}
          fbkFbkIcn={fbkFbkIcn}
          fbkFbkTxt={fbkFbkTxt}
          fbkFbkTxtSrc={fbkFbkTxtSrc}
          fbkFbkIcnSrc={fbkFbkIcnSrc}
          fbkFbkClr={fbkFbkClr}
          fldName={fieldFldName}
          onChange={fieldOnChange}
          fldPholdSrc={fieldFldPholdSrc}
          fldClick={fieldFldClick}
          fldHeight={fieldFldHeight}
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
