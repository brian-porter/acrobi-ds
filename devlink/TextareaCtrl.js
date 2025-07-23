"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./TextareaCtrl.module.css";

export function TextareaCtrl({
  as: _Component = _Builtin.Block,
  fbk = false,
  fldId,
  fldName,
  fldPholdSrc = "Placeholder",
  fldBrdClr,
  fldHeight,
  fbkFbkIcn = false,
  fbkFbkTxt = true,
  fbkFbkTxtSrc = "Feedback text",
  fbkFbkIcnSrc = "act_check_circle",
  fbkFbkClr = "fd500",
  tabOrder,
  onChange,
  fldClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "textarea_wrap")}
      tag="div"
      tabIndex={tabOrder}
      xHeight={fldHeight}
      id={fldId}
    >
      <_Builtin.Block className={_utils.cx(_styles, "textarea_main")} tag="div">
        <_Builtin.FormTextarea
          className={_utils.cx(_styles, "textarea")}
          name="field"
          maxLength={5000}
          required={false}
          autoFocus={false}
          data-field-brd={fldBrdClr}
          x-name={fldName}
          onChange={onChange}
          x-placeholder={fldPholdSrc}
          id="field"
          {...fldClick}
        />
        {fbk ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "feedback-txtarea")}
            tag="div"
          >
            <Label
              lblClr={fbkFbkClr}
              icn={fbkFbkIcn}
              txt={fbkFbkTxt}
              txtSrc={fbkFbkTxtSrc}
              icnSrc={fbkFbkIcnSrc}
              icnLoc="r"
              lblSz="r3"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
