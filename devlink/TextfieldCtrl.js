"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Icon } from "./Icon";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./TextfieldCtrl.module.css";

export function TextfieldCtrl({
  as: _Component = _Builtin.Block,
  fldTxt = true,
  fldIcn = false,
  fldBtn = false,
  fbk = false,
  fldIcnSrc = "Search",
  fldIcnDisp = "n",
  fldBrdClr,
  fbkFbkTxt = true,
  fbkFbkIcn = false,
  fbkFbkTxtSrc = "Feedback here",
  fbkFbkIcnSrc = "check_circle",
  fbkFbkClr = "fd500",
  fldPholdSrc = "Placeholder",
  fldPholdSrcX = "PlaceholderX",
  fldBtnIcnSrc = "mic",
  fldBtnIcnAlt = "Microphone",
  autoComp = "off",
  tabOrder,
  autoFocus,
  readOnly,
  fldId,
  onChange,
  fldBtnClick = {},
  fldClick = {},
  inpName,
  inpType,
  required,
}) {
  return fldTxt ? (
    <_Component className={_utils.cx(_styles, "textfield_wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "textfield_main")}
        tag="div"
      >
        {fldIcn ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "field-icon")}
            tag="div"
          >
            <Icon icnSrc={fldIcnSrc} icnClr="n500" />
          </_Builtin.Block>
        ) : null}
        <_Builtin.FormTextInput
          className={_utils.cx(_styles, "text-input")}
          autoFocus={false}
          maxLength={256}
          name="field"
          type="text"
          disabled={false}
          required={false}
          x-placeholder={fldPholdSrcX}
          tabIndex={tabOrder}
          data-field-icn={fldIcnDisp}
          data-field-brd={fldBrdClr}
          onChange={onChange}
          autoComplete={autoComp}
          x-readonly={readOnly}
          x-autofocus={autoFocus}
          x-name={inpName}
          x-type={inpType}
          x-required={required}
          data-placeholder={fldPholdSrc}
          id={fldId}
          {...fldClick}
        />
        {fbk ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "feedback-txt")}
            tag="div"
          >
            <Label
              txtSrc={fbkFbkTxtSrc}
              txt={fbkFbkTxt}
              icnSrc={fbkFbkIcnSrc}
              lblClr={fbkFbkClr}
              icn={fbkFbkIcn}
              icnLoc="r"
              lblSz="r3"
            />
          </_Builtin.Block>
        ) : null}
        {fldBtn ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "field_btn_wrap")}
            tag="nav"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "field_btn_main")}
              tag="div"
              {...fldBtnClick}
            >
              <Label
                txtSrc={fldBtnIcnAlt}
                icnSrc={fldBtnIcnSrc}
                icnLoc="r"
                txt={false}
              />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
