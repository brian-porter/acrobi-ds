"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FieldLabel } from "./FieldLabel";
import { RdoGrpCtrl } from "./RdoGrpCtrl";
import { FieldHelper } from "./FieldHelper";
import * as _utils from "./utils";
import _styles from "./RadioForm.module.css";

export function RadioForm({
  as: _Component = _Builtin.Block,
  fld = true,
  lblTop = true,
  lblTopLblSrc = "Label",
  lblTopLblFor = "FldName",
  lblTopLblSz = "r4",
  lblTopLblClr = "n900",
  lblTopLblShdw,
  lblTopOpt = false,
  lblTopOptSrc = "label right",
  lblTopOptSz = "r4",
  lblTopOptClr = "n300",
  fldHelp = false,
  fieldItmMap,
  fieldExampleRdoItm = true,
  fldHelpHelpL = true,
  fldHelpHelpR = false,
  fldHelpHelpLSrc = "helper copy",
  fldHelpHelpRSrc = "0/200",
  fldHelpHelpShdw,
  fieldItmName,
  fieldItmValue,
  fieldItmLblTxtSrc = "Label",
  fieldAlign = "l",
  fieldItmClick = {},
  fieldFbk = false,
  fieldFbkTxtSrc = "Feedback message",
  fieldFbkIcnSrc = "clearcirc",
  fieldFbkClr = "fd500",
  fieldFbkIcnLoc = "r",
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
        <RdoGrpCtrl
          fieldRdoCtrlMap={fieldItmMap}
          fieldExampleRdoCtrl={fieldExampleRdoItm}
          fieldAlign={fieldAlign}
          fieldItmTxtSrc={fieldItmLblTxtSrc}
          fieldFbk={fieldFbk}
          fieldFbkTxtSrc={fieldFbkTxtSrc}
          fieldFbkIcnSrc={fieldFbkIcnSrc}
          fieldFbkClr={fieldFbkClr}
          fieldFbkIcnLoc={fieldFbkIcnLoc}
          fieldItmName={fieldItmName}
          fieldItmValue={fieldItmValue}
          fieldItmClick={fieldItmClick}
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
