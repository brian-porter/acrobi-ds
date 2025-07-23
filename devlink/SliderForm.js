"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FieldLabel } from "./FieldLabel";
import { SliderCtrl } from "./SliderCtrl";
import { FieldHelper } from "./FieldHelper";
import * as _utils from "./utils";
import _styles from "./SliderForm.module.css";

export function SliderForm({
  as: _Component = _Builtin.Block,
  fld = true,
  lblTop = true,
  lblTopLblSrc = "Label",
  lblTopLblFor,
  fldHelp = false,
  fieldSingleSlide = true,
  fieldDualSlide = false,
  fieldSliderMin = "0",
  fieldSliderMax = "100",
  fieldSliderStep = "1",
  fieldSliderValue = "0",
  fieldFillId = "fill",
  fieldHandleId = "handle",
  fieldTrackId = "track",
  fieldWrapperId = "wrapper",
  fieldStart,
  fieldStart2,
  fldHelpHelpL = true,
  fldHelpHelpR = false,
  fldHelpHelpLSrc = "helper copy",
  fldHelpHelpRSrc = "0/200",
  lblTopLblSz = "r4",
  lblTopLblClr = "n900",
  lblTopLblShdw,
  lblTopOpt = false,
  lblTopOptSrc = "required",
  lblTopOptSz = "r4",
  lblTopOptClr = "n300",
  fieldValue = "display-value",
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
        <SliderCtrl
          wrapperId={fieldWrapperId}
          min={fieldSliderMin}
          max={fieldSliderMax}
          step={fieldSliderStep}
          trackId={fieldTrackId}
          handleId={fieldHandleId}
          start={fieldStart}
          start2={fieldStart2}
          fillId={fieldFillId}
          dual={fieldDualSlide}
          single={fieldSingleSlide}
          value={fieldValue}
        />
        <FieldHelper
          fldHelp={fldHelp}
          helpLSrc={fldHelpHelpLSrc}
          helpRSrc={fldHelpHelpRSrc}
          helpR={fldHelpHelpR}
          helpL={fldHelpHelpL}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
