"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { RdoCtrl } from "./RdoCtrl";
import * as _utils from "./utils";
import _styles from "./RdoGrpCtrl.module.css";

export function RdoGrpCtrl({
  as: _Component = _Builtin.Block,
  fieldRdoCtrlMap,
  fieldExampleRdoCtrl = false,
  fieldItmTxtSrc = "Label",
  fieldItmName,
  fieldItmValue,
  fieldAlign = "l",
  fieldItmClick = {},
  fieldFbk = false,
  fieldFbkTxtSrc = "Feedback message",
  fieldFbkIcnSrc = "clearcirc",
  fieldFbkClr = "fd500",
  fieldFbkIcnLoc = "r",
}) {
  return (
    <_Component className={_utils.cx(_styles, "rdogrp_wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "grp_main")}
        tag="div"
        data-input-align="l"
      >
        {fieldRdoCtrlMap ??
          (fieldExampleRdoCtrl ? (
            <_Builtin.Block tag="div">
              <RdoCtrl
                align={fieldAlign}
                fbk={fieldFbk}
                itmLblSrc={fieldItmTxtSrc}
                fbkFbkTxtSrc={fieldFbkTxtSrc}
                fbkFbkIcnSrc={fieldFbkIcnSrc}
                fbkFbkClr={fieldFbkClr}
                fbkFbkIcnLoc={fieldFbkIcnLoc}
                itmName={fieldItmName}
                itmValue={fieldItmValue}
                itmClick={fieldItmClick}
              />
            </_Builtin.Block>
          ) : null)}
      </_Builtin.Block>
    </_Component>
  );
}
