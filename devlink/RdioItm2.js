"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./RdioItm2.module.css";

export function RdioItm2({
  as: _Component = _Builtin.FormRadioWrapper,
  lbl = true,
  fbk = false,
  name,
  id,
  value,
  lblSrc = "Label",
  lblSz = "r3",
  rdioAlign = "l",
  tabOrder = "0",
  fbkFbkTxt = true,
  fbkFbkIcn = true,
  fbkFbkTxtSrc = "Feedback message",
  fbkFbkIcnSrc = "act_clearcirc",
  fbkFbkLblClr = "fd500",
}) {
  return (
    <_Component data-input-align={rdioAlign}>
      <_Builtin.FormRadioInput
        className={_utils.cx(_styles, "rdo")}
        type="radio"
        name="Radio"
        value="Radio"
        data-name="Radio"
        required={false}
        tab-index={tabOrder}
        x-value={value}
        x-name={name}
        id={id}
        form={{
          type: "radio-input",
          name: "Radio",
        }}
        inputType="custom"
        customClassName="w-form-formradioinput--inputType-custom"
      />
      {lbl ? (
        <_Builtin.FormInlineLabel
          className={_utils.cx(_styles, "label")}
          data-lbl-size={lblSz}
        >
          {lblSrc}
        </_Builtin.FormInlineLabel>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "rdoitm_main")} tag="div">
        {fbk ? (
          <_Builtin.Block className={_utils.cx(_styles, "itm_fbk")} tag="div">
            <Label
              txtSrc={fbkFbkTxtSrc}
              txt={fbkFbkTxt}
              icnSrc={fbkFbkIcnSrc}
              lblClr={fbkFbkLblClr}
              icn={fbkFbkIcn}
              icnLoc="r"
              lblSz="r3"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
