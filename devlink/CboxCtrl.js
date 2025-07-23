"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./CboxCtrl.module.css";

export function CboxCtrl({
  as: _Component = _Builtin.FormCheckboxWrapper,
  comp = true,
  txt = true,
  link = false,
  fbk = false,
  id = "cbox",
  itmName,
  itmValue,
  itmActive = "False",
  itmLblSrc = "Label",
  itmLblSz = "r3",
  lblFor = "cbox",
  itmClick = {},
  align = "l",
  tabOrder = "0",
  linkTxtSrc = "Link here",
  fbkFbkTxt = true,
  fbkFbkIcn = true,
  fbkFbkTxtSrc = "Feedback message",
  fbkFbkIcnSrc = "clearcirc",
  fbkFbkClr = "fd500",
  onChange,

  linkSrc = {
    href: "#",
  },

  linkClick = {},
  lblShdw,
  linkShdw,
  fbkFbkIcnLoc = "r",
}) {
  return comp ? (
    <_Component
      className={_utils.cx(_styles, "itm_ctrl")}
      data-input-align={align}
      {...itmClick}
    >
      <_Builtin.FormCheckboxInput
        className={_utils.cx(_styles, "cbox")}
        type="checkbox"
        required={false}
        checked={itmActive}
        tabIndex={tabOrder}
        x-name={itmName}
        x-value={itmValue}
        onChange={onChange}
        id={id}
        form={{
          type: "checkbox-input",
          name: "",
        }}
        inputType="custom"
        customClassName="w-checkbox-input--inputType-custom"
        {...itmClick}
      />
      {txt ? (
        <_Builtin.FormInlineLabel
          className={_utils.cx(_styles, "cbox-label")}
          data-lbl-size={itmLblSz}
          data-ts={lblShdw}
          htmlFor={lblFor}
        >
          {itmLblSrc}
        </_Builtin.FormInlineLabel>
      ) : null}
      {link ? (
        <_Builtin.Link
          className={_utils.cx(_styles, "cbox-link")}
          button={false}
          block="inline"
          options={linkSrc}
          {...linkClick}
        >
          <Label
            txtSrc={linkTxtSrc}
            lblShad={linkShdw}
            lblSz="r3"
            icn={false}
            icnLoc="r"
          />
        </_Builtin.Link>
      ) : null}
      {fbk ? (
        <_Builtin.Block className={_utils.cx(_styles, "itm_fbk")} tag="div">
          <Label
            lblClr={fbkFbkClr}
            icnSrc={fbkFbkIcnSrc}
            txtSrc={fbkFbkTxtSrc}
            txt={fbkFbkTxt}
            icn={fbkFbkIcn}
            icnLoc={fbkFbkIcnLoc}
            lblSz="r3"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  ) : null;
}
