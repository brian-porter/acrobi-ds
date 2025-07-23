"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Label } from "./Label";
import * as _utils from "./utils";
import _styles from "./RdoCtrl.module.css";

export function RdoCtrl({
  as: _Component = _Builtin.FormRadioWrapper,
  fbk = false,
  id,
  itmName,
  itmValue,
  itmLblSrc = "Label",
  itmLblSz = "r3",
  align,
  tabOrder,
  fbkFbkTxt = true,
  fbkFbkIcn = true,
  fbkFbkTxtSrc = "Feedback message",
  fbkFbkIcnSrc = "clearcirc",
  fbkFbkClr = "fd500",
  fbkFbkIcnLoc = "r",
  onChange,
  itmClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "rdo_ctrl")}
      data-input-align={align}
      {...itmClick}
    >
      <_Builtin.FormRadioInput
        className={_utils.cx(_styles, "rdo")}
        type="radio"
        name="Radio"
        value="Radio"
        data-name="Radio"
        required={false}
        tab-index={tabOrder}
        x-value={itmValue}
        x-name={itmName}
        onChange={onChange}
        id={id}
        form={{
          type: "radio-input",
          name: "Radio",
        }}
        inputType="custom"
        customClassName="w-form-formradioinput--inputType-custom"
        {...itmClick}
      />
      <_Builtin.FormInlineLabel
        className={_utils.cx(_styles, "label")}
        data-lbl-size={itmLblSz}
      >
        {itmLblSrc}
      </_Builtin.FormInlineLabel>
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
  );
}
