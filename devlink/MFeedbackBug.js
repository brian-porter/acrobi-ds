"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Message } from "./Message";
import { TextareaForm } from "./TextareaForm";
import { CboxForm } from "./CboxForm";
import { ButtonPanel } from "./ButtonPanel";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MFeedbackBug.module.css";

export function MFeedbackBug({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  bugChange,
  bugCount = "0/500",
  expectChange,
  expectCount = "0/500",
  actualChange,
  actualCount = "0/500",
  sugChange,
  sugCount = "0/500",
  anonChange,
  doClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-fb")}
      tag="section"
      id="Feedback-Bug"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          sz="m"
          titleSrc="Bug Report"
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <Message
          icn={false}
          bodySrc={
            <>
              {"- Device type (OS, model, app version, etc.)"}
              <br />
              {"- Time & date stamp"}
              <br />
              {"- The screen you were on along with a screenshot"}
              <br />
              {"- Connection strength"}
              <br />
              {"- Your ID, unless you'd like to remain anonymous"}
            </>
          }
          titleSrc="Details auto collected with this report include..."
          bodyClr="n700"
        />
        <_Builtin.FormWrapper className={_utils.cx(_styles, "form-share")}>
          <_Builtin.FormForm
            name="wf-form-Bug-Report"
            data-name="Bug Report"
            method="get"
            id="wf-form-Bug-Report"
          >
            <TextareaForm
              fldHelpHelpRSrc={bugCount}
              fieldOnChange={bugChange}
              fldHelpHelpLSrc="what are the steps"
              lblTopLblSrc="How can we reproduce the bug?"
              fldHelpHelpR={true}
              lblTopLblFor="bug"
              fieldFldId="bug"
              fieldFldName="bug"
            />
            <TextareaForm
              fldHelpHelpRSrc={expectCount}
              fieldOnChange={expectChange}
              fldHelpHelpLSrc="describe the scenario"
              lblTopLblSrc="What were the expected results?"
              fldHelpHelpR={true}
              lblTopLblFor="expect"
              fieldFldId="expect"
              fieldFldName="expect"
            />
            <TextareaForm
              fldHelpHelpRSrc={actualCount}
              fieldOnChange={actualChange}
              fldHelpHelpR={true}
              lblTopLblSrc="What were the actual results?"
              fldHelpHelpLSrc="is it pausing, crashing, unresposive, errors, etc."
              lblTopLblFor="actual"
              fieldFldId="actual"
              fieldFldName="actual"
            />
            <TextareaForm
              fldHelpHelpRSrc={sugCount}
              fieldOnChange={sugChange}
              fldHelpHelpR={true}
              fldHelpHelpLSrc="please provide details"
              lblTopLblSrc="Additional comments or suggestions"
              lblTopLblFor="sug"
              fieldFldId="sug"
              fieldFldName="sug"
            />
            <CboxForm />
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
        bs="m"
      >
        <ButtonPanel
          btn1Click={doClick}
          btn3={false}
          btn2={false}
          btn1TxtSrc="Submit"
        />
        <Spacer szDep="40" />
      </_Builtin.Block>
    </_Component>
  );
}
