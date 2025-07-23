"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FieldLabel } from "./FieldLabel";
import { TextfieldLinkCtrl } from "./TextfieldLinkCtrl";
import { FieldHelper } from "./FieldHelper";
import * as _utils from "./utils";
import _styles from "./TextfieldLinkForm.module.css";

export function TextfieldLinkForm({
  as: _Component = _Builtin.Block,
  lblSrc = "Label",
  fldLinkTxtSrc = "change password",
  fldClick = {},

  fldLink = {
    href: "#",
  },

  fldHelp = true,
  helpLSrc = "helper copy",
}) {
  return (
    <_Component className={_utils.cx(_styles, "form_itm_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "form_main")} tag="div">
        <FieldLabel lblSrc={lblSrc} fldLblTop={true} />
        <TextfieldLinkCtrl
          fldLinkTxtSrc={fldLinkTxtSrc}
          fldLink={fldLink}
          fldClick={fldClick}
        />
        <FieldHelper fldHelp={fldHelp} helpLSrc={helpLSrc} />
      </_Builtin.Block>
    </_Component>
  );
}
