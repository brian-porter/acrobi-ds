"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FieldLabel } from "./FieldLabel";
import { SegBtnCtrl } from "./SegBtnCtrl";
import { FieldHelper } from "./FieldHelper";
import * as _utils from "./utils";
import _styles from "./SegBtnForm.module.css";

export function SegBtnForm({
  as: _Component = _Builtin.Block,
  fld = true,
  lblTop = true,
  lblTopLblSrc = "Label",
  fldHelp = false,
  fieldBtn3 = true,
  fieldBtn4 = false,
  fieldBtn5 = false,
  fieldSegBtnClr = "p",
  fieldBtn1Icn = false,
  fieldBtn1Txt = true,
  fieldBtn1TxtSrc = "Label",
  fieldBtn1IcnSrc = "default",

  fieldBtn1Link = {
    href: "#",
  },

  fieldBtn1Actv = "true",
  fieldBtn1Click = {},
  fieldBtn2Icn = false,
  fieldBtn2Txt = true,
  fieldBtn2TxtSrc = "Label",
  fieldBtn2IcnSrc = "default",

  fieldBtn2Link = {
    href: "#",
  },

  fieldBtn2Actv,
  fieldBtn2Click = {},
  fieldBtn3Icn = false,
  fieldBtn3Txt = true,
  fieldBtn3TxtSrc = "Label",
  fieldBtn3IcnSrc = "default",

  fieldBtn3Link = {
    href: "#",
  },

  fieldBtn3Actv,
  fieldBtn3Click = {},
  fieldBtn4Icn = false,
  fieldBtn4Txt = true,
  fieldBtn4TxtSrc = "Label",
  fieldBtn4IcnSrc = "default",

  fieldBtn4Link = {
    href: "#",
  },

  fieldBtn4Actv,
  fieldBtn4Click = {},
  fieldBtn5Icn = false,
  fieldBtn5Txt = true,
  fieldBtn5TxtSrc = "Label",
  fieldBtn5IcnSrc = "default",

  fieldBtn5Link = {
    href: "#",
  },

  fieldBtn5Actv,
  fieldBtn5Click = {},
  fldHelpHelpL = true,
  fldHelpHelpR = false,
  fldHelpHelpLSrc = "helper copy",
  fldHelpHelpRSrc = "0/200",
  lblTopLblFor,
  lblTopLblSz = "r4",
  lblTopLblClr = "n900",
  lblTopLblShdw,
  lblTopOpt = false,
  lblTopOptSrc = "required",
  lblTopOptSz = "r4",
  lblTopOptClr = "n300",
  fldHelpHelpShdw,
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
        <SegBtnCtrl
          btn1Btn1Actv="true"
          btn2Btn2Actv="false"
          btn4={true}
          btn5={false}
          btn1Btn1Icn={false}
          btn2Btn2Icn={false}
          btn4Btn4Icn={false}
          btn3Btn3Icn={false}
          btn5Btn5Icn={false}
          btn1Btn1TxtSrc="Online"
          btn2Btn2TxtSrc="In Store"
          btn3Btn3TxtSrc="Pickup"
          btn4Btn4TxtSrc="Shipped"
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
