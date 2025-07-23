"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FieldLabel } from "./FieldLabel";
import { RateCtrl } from "./RateCtrl";
import { FieldHelper } from "./FieldHelper";
import * as _utils from "./utils";
import _styles from "./RatingForm.module.css";

export function RatingForm({
  as: _Component = _Builtin.Block,
  fld = true,
  fldLbl = true,
  fldHelp = false,
  fldTopLblSrc = "Label",
  fldTopLblFor,
  fldTopLblSz = "r4",
  fldTopLblClr = "n900",
  fldTopLblShdw,
  fldTopOpt = false,
  fldTopOptSrc = "required",
  fldTopOptSz = "r4",
  fldTopOptClr = "n300",
  fieldValue = "3.5",
  fieldRateId,
  fldHelpHelpL = true,
  fldHelpHelpR = false,
  fldHelpHelpLSrc = "helper copy",
  fldHelpHelpRSrc = "0/200",
  fldHelpHelpShdw,
}) {
  return fld ? (
    <_Component className={_utils.cx(_styles, "form_itm_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "form_main")} tag="div">
        <FieldLabel
          fldLblTop={fldLbl}
          lblSrc={fldTopLblSrc}
          optSrc={fldTopOptSrc}
          opt={fldTopOpt}
          lblFor={fldTopLblFor}
          lblSz={fldTopLblSz}
          lblClr={fldTopLblClr}
          lblShdw={fldTopLblShdw}
          optSz={fldTopOptSz}
          optClr={fldTopOptClr}
        />
        <RateCtrl
          value={fieldValue}
          rateId={fieldRateId}
          rate1={true}
          rate2={true}
          rate3={true}
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
