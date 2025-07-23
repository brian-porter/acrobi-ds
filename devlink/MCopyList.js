"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ListItmCtrl } from "./ListItmCtrl";
import { Spacer } from "./Spacer";
import { InputWBtns } from "./InputWBtns";
import * as _utils from "./utils";
import _styles from "./MCopyList.module.css";

export function MCopyList({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  doClick = {},
  fldOnChange,
  clearSetClick = {},
  btmShdw = "m",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-copy")}
      tag="section"
      id="Copy"
    >
      <SecHead act1Click={cancelClick} titleSrc="Copy" sz="xl" titleSz="h4" />
      <_Builtin.FormWrapper className={_utils.cx(_styles, "form-copy")}>
        <_Builtin.FormForm
          name="wf-form-Copy"
          data-name="Copy"
          method="get"
          id="wf-form-Copy"
        >
          <ListItmCtrl
            tTToglClick={clearSetClick}
            pPTitleSrc="Clear list settings"
            pPSubtxtSrc="Create new access and control properties"
            tTTogl={true}
            primeDiv=""
            trailDiv=""
          />
          <Spacer szDep="48" />
        </_Builtin.FormForm>
        <_Builtin.FormSuccessMessage>
          <_Builtin.Block tag="div">
            {"Thank you! Your submission has been received!"}
          </_Builtin.Block>
        </_Builtin.FormSuccessMessage>
        <_Builtin.FormErrorMessage>
          <_Builtin.Block tag="div">
            {"Oops! Something went wrong while submitting the form."}
          </_Builtin.Block>
        </_Builtin.FormErrorMessage>
      </_Builtin.FormWrapper>
      <_Builtin.Block
        className={_utils.cx(_styles, "dock-btm")}
        tag="div"
        bs={btmShdw}
      >
        <InputWBtns
          tTBtnClick={doClick}
          fldFldOnChange={fldOnChange}
          fldFldLIcnSrc="copy"
          lLBtn={false}
          tTBtnStyle="pf"
          tTBtnTxtSrc="Create"
          tTBtnTxt={true}
          tTBtnIcn={false}
          tTBtn={true}
          tTBtnIcnSrc="submit"
          lLBtnIcnSrc="scan_qr"
        />
        <Spacer size="16" />
      </_Builtin.Block>
    </_Component>
  );
}
