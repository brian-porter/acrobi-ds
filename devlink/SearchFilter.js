"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ChipsSs } from "./ChipsSs";
import { InputWBtns } from "./InputWBtns";
import * as _utils from "./utils";
import _styles from "./SearchFilter.module.css";

export function SearchFilter({
  as: _Component = _Builtin.FormWrapper,
  filterMap,
  exampleMap = true,
  lBtnIcnSrc = "lock_key",
  lBtnClick = {},
  fldClick = {},
  newBtnClick = {},
  fldOnChange,
}) {
  return (
    <_Component className={_utils.cx(_styles, "form-share")}>
      <_Builtin.FormForm
        name="wf-form-Search"
        data-name="Search"
        method="get"
        id="wf-form-Search"
      >
        <ChipsSs
          cellMap={filterMap}
          exampleCells={exampleMap}
          chipAvtr={false}
          chipBase={true}
          chipChipIcnSrc="default"
        />
        <InputWBtns
          lLBtnClick={lBtnClick}
          fldFldClick={fldClick}
          tTBtnClick={newBtnClick}
          fldFldOnChange={fldOnChange}
          lLBtnIcnSrc={lBtnIcnSrc}
          tTBtn={true}
          tTBtnTxt={true}
          tTBtnIcn={false}
          tTBtnStyle="pf"
          tTBtnTxtSrc="New"
          fldFldLIcn={true}
          fldFldLIcnSrc="bookmark_folder"
          fldFldTBtn={false}
        />
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
    </_Component>
  );
}
