"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FieldLabel } from "./FieldLabel";
import { SwitchGrpCtrl } from "./SwitchGrpCtrl";
import { FieldHelper } from "./FieldHelper";
import * as _utils from "./utils";
import _styles from "./SwitchForm.module.css";

export function SwitchForm({
  as: _Component = _Builtin.Block,
  flds = true,
  lblTop = true,
  lblTopLblSrc = "Label",
  lblTopLblFor,
  lblTopLblSz = "r4",
  lblTopLblClr = "n900",
  lblTopLblShdw,
  lblTopOpt = false,
  lblTopOptSrc = "label right",
  lblTopOptSz = "r4",
  lblTopOptClr = "n300",
  fieldTglMap,
  fieldExampleToggleGroup = true,
  fldHelp = false,
  fldHelpHelpL = true,
  fldHelpHelpR = false,
  fldHelpHelpLSrc = "helper copy",
  fldHelpHelpRSrc = "0/200",
  fldHelpHelpShdw,
  fieldTglLableSrc = "Lable",
  fieldTglClick = {},
}) {
  return flds ? (
    <_Component className={_utils.cx(_styles, "form_itm_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "form_main")} tag="div">
        <FieldLabel
          fldLblTop={lblTop}
          lblSrc={lblTopLblSrc}
          optSrc={lblTopOptSrc}
          opt={lblTopOpt}
          lblShdw={lblTopLblShdw}
          lblSz={lblTopLblSz}
          optSz={lblTopOptSz}
          lblClr={lblTopLblClr}
          optClr={lblTopOptClr}
          lblFor={lblTopLblFor}
        />
        <SwitchGrpCtrl
          exampleToggleGroup={fieldExampleToggleGroup}
          tglMap={fieldTglMap}
          exampleTglLableSrc={fieldTglLableSrc}
          exampleTglClick={fieldTglClick}
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
