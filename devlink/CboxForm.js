"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FieldLabel } from "./FieldLabel";
import { CboxGrpCtrl } from "./CboxGrpCtrl";
import { FieldHelper } from "./FieldHelper";
import * as _utils from "./utils";
import _styles from "./CboxForm.module.css";

export function CboxForm({
  as: _Component = _Builtin.Block,
  fld = true,
  lblTop = true,
  lblTopLblSrc = "Label",
  lblTopLblFor = "FldName",
  fieldItmMap,
  fieldExampleCboxItm = true,
  lblTopLblSz = "r4",
  lblTopLblClr = "n900",
  lblTopLblShdw,
  lblTopOpt = false,
  lblTopOptSrc = "label right",
  lblTopOptSz = "r4",
  lblTopOptClr = "n300",
  fldHelp = false,
  fldHelpHelpL = true,
  fldHelpHelpR = false,
  fldHelpHelpLSrc = "helper copy",
  fldHelpHelpRSrc = "0/200",
  fldHelpHelpShdw,
  fieldItmLblTxtSrc = "Label",
  fieldItmName,
  fieldItmValue,
  fieldItmActive = "False",
  fieldAlign = "l",
  fieldItmClick = {},
  fieldLink = false,
  fieldLinkTxtSrc = "Link here",
  fieldLinkClick = {},
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
          optSz={lblTopOptSz}
          lblClr={lblTopLblClr}
          optClr={lblTopOptClr}
        />
        <CboxGrpCtrl
          cboxCtrlMap={fieldItmMap}
          exampleCboxCtrl={fieldExampleCboxItm}
          align={fieldAlign}
          fieldItmTxtSrc={fieldItmLblTxtSrc}
          fieldFbk={fieldFbk}
          fieldFbkTxtSrc={fieldFbkTxtSrc}
          fieldFbkIcnSrc={fieldFbkIcnSrc}
          fieldFbkClr={fieldFbkClr}
          fieldFbkIcnLoc={fieldFbkIcnLoc}
          fieldItmName={fieldItmName}
          fieldItmValue={fieldItmValue}
          fieldLinkClick={fieldLinkClick}
          fieldLink={fieldLink}
          fieldLinkTxtSrc={fieldLinkTxtSrc}
          fieldItmActive={fieldItmActive}
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
