"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Message } from "./Message";
import { SliderForm } from "./SliderForm";
import { TextareaForm } from "./TextareaForm";
import { ButtonPanel } from "./ButtonPanel";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MFeedbackUx.module.css";

export function MFeedbackUx({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  lookValue = "0",
  easeValue = "0",
  installValue = "0",
  firstChange,
  firstCount = "0/500",
  annoyChange,
  annoyCount = "0/500",
  sugChange,
  sugCount = "0/500",
  doClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-fb")}
      tag="section"
      id="Feedback-UX"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          titleSrc="User Research"
          sz="m"
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <Message
          icn={false}
          titleSrc="How would you rate the following..."
          bodySrc="From 0 being horrible, to excellent with a 100%."
          bodyClr="n700"
        />
        <_Builtin.FormWrapper className={_utils.cx(_styles, "form-share")}>
          <_Builtin.FormForm
            name="wf-form-UX-Feedback"
            data-name="UX Feedback"
            method="get"
            id="wf-form-UX-Feedback"
          >
            <SliderForm
              fieldSliderValue={lookValue}
              lblTopLblSrc="The look and feel of the app"
              fldHelp={false}
              lblTopLblFor="look"
            />
            <SliderForm
              fieldSliderValue={easeValue}
              fldHelp={false}
              lblTopLblSrc="The ease of use of the app"
              lblTopLblFor="ease"
            />
            <SliderForm
              fieldSliderValue={installValue}
              fldHelp={false}
              lblTopLblSrc="Installation and onboarding was easy to do"
              lblTopLblFor="install"
            />
            <TextareaForm
              fldHelpHelpRSrc={firstCount}
              fieldOnChange={firstChange}
              lblTopLblSrc="What was your first impression of the app?"
              fldHelpHelpR={true}
              fldHelpHelpLSrc="please provide details"
              lblTopLblFor="first"
              fieldFldId="first"
              fieldFldName="first"
            />
            <TextareaForm
              fldHelpHelpRSrc={annoyCount}
              fieldOnChange={annoyChange}
              fldHelpHelpLSrc="please provide details"
              fldHelpHelpR={true}
              lblTopLblSrc="What confused or annoyed you about the app?"
              lblTopLblFor="annoy"
              fieldFldId="annoy"
              fieldFldName="annoy"
            />
            <TextareaForm
              fldHelpHelpRSrc={sugCount}
              fieldOnChange={sugChange}
              fldHelpHelpLSrc="please provide details"
              fldHelpHelpR={true}
              lblTopLblSrc="Additional comments or suggestions"
              lblTopLblFor="sug"
              fieldFldId="sug"
              fieldFldName="sug"
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
