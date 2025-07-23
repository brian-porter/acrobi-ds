"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { TextfieldForm } from "./TextfieldForm";
import { TextareaForm } from "./TextareaForm";
import { InputWBtns } from "./InputWBtns";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MRuleAdd.module.css";

export function MRuleAdd({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  nameChange,
  descChange,
  erase = false,
  eraseClick = {},
  doBtnClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-add-rule")}
      tag="section"
      mini=""
      id="Rules"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          titleSrc="Rule Properties"
          sz="xl"
          act1={true}
          titleSz="h4"
          subtxt={true}
          subtxtSrc="Giving a clear name and description of this rule"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <_Builtin.FormWrapper>
          <_Builtin.FormForm
            name="email-form"
            data-name="Email Form"
            method="get"
            id="email-form"
          >
            <TextfieldForm
              fieldOnChange={nameChange}
              fldHelpHelpLSrc=""
              lblTopOpt={true}
              lblTopOptSrc="required"
              fldHelpHelpRSrc="0/20"
              fldHelpHelpR={true}
              lblTopLblSrc="Name"
              fieldFldPlaceholderSrc="group name"
              fldHelp={true}
              fieldTabOrder="0"
            />
            <TextareaForm
              fieldOnChange={descChange}
              lblTopLblSrc="Description"
              fldHelpHelpLSrc="give the details of this rule"
              fldHelpHelpR={true}
              fldHelpHelpRSrc="0/250"
              fieldTabOrder="0"
              lblTopOpt={true}
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
        </_Builtin.FormWrapper>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "a-footer")}
        tag="div"
        data-top-shadow="y"
      >
        <InputWBtns
          lLBtn={erase}
          lLBtnClick={eraseClick}
          tTBtnClick={doBtnClick}
          tTBtn={true}
          pPFld={false}
          lLBtnIcnSrc="delete"
          tTBtnTxt={true}
          tTBtnIcn={false}
          tTBtnTxtSrc="Done"
          tTBtnIcnSrc="default"
          tTBtnStyle="pf"
        />
        <Spacer size="16" />
      </_Builtin.Block>
    </_Component>
  );
}
