"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FieldLabel } from "./FieldLabel";
import { SelectlistCtrl } from "./SelectlistCtrl";
import { FieldHelper } from "./FieldHelper";
import * as _utils from "./utils";
import _styles from "./SelectlistForm.module.css";

export function SelectlistForm({
  as: _Component = _Builtin.Block,
  fld = true,
  lblTop = true,
  fldHelp = false,
  fbk = false,
  lblTopLblSrc = "Label",
  lblTopLblFor,
  lblTopLblSz = "r4",
  lblTopLblClr = "n900",
  lblTopLblShdw,
  lblTopOpt = false,
  lblTopOptSrc = "required",
  lblTopOptSz = "r4",
  lblTopOptClr = "n300",
  fieldFldId,
  fieldFldValue,
  fieldPHoldSrc = "Placeholder",
  fieldPHoldClr = "n500",
  fieldFldBrdClr,
  fieldSelectDrpHide = false,
  fieldSelectMap,
  fldHelpHelpL = true,
  fldHelpHelpR = false,
  fldHelpHelpLSrc = "helper copy",
  fldHelpHelpRSrc = "0/200",
  fbkFbkTxt = true,
  fbkFbkIcn = false,
  fbkFbkTxtSrc = "Feedback text",
  fbkFbkIcnSrc = "act_check_circle",
  fbkFbkClr = "fd500",
  fldHelpHelpShdw,
  fieldOnChange,
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
        <SelectlistCtrl
          pHoldSrc={fieldPHoldSrc}
          fbk={fbk}
          pHoldClr={fieldPHoldClr}
          fldBrdClr={fieldFldBrdClr}
          selectMap={fieldSelectMap}
          fbkFbkTxt={fbkFbkTxt}
          fbkFbkIcn={fbkFbkIcn}
          fbkFbkTxtSrc={fbkFbkTxtSrc}
          fbkFbkIcnSrc={fbkFbkIcnSrc}
          fbkFbkClr={fbkFbkClr}
          fldId={fieldFldId}
          fldValue={fieldFldValue}
          onChange={fieldOnChange}
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
