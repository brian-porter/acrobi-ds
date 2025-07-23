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
import _styles from "./MFeedbackGen.module.css";

export function MFeedbackGen({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  easeValue = "0",
  featValue = "0",
  fastValue = "0",
  reliableValue = "0",
  overallValue = "0",
  sugChange,
  sugCount = "0/500",
  doClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-fb")}
      tag="section"
      id="Feedback-General"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          titleSrc="General Feedback"
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
            name="wf-form-General-Feedback"
            data-name="General Feedback"
            method="get"
            id="wf-form-General-Feedback"
          >
            <SliderForm
              fieldSliderValue={easeValue}
              lblTopLblSrc="The app is easy to use"
              fldHelp={false}
              lblTopLblFor="ease"
            />
            <SliderForm
              fieldSliderValue={featValue}
              fldHelp={false}
              lblTopLblSrc="The app has the features I want"
              lblTopLblFor="feat"
            />
            <SliderForm
              fieldSliderValue={fastValue}
              fldHelp={false}
              lblTopLblSrc="The app feels fast & responsive"
              lblTopLblFor="fast"
            />
            <SliderForm
              fieldSliderValue={reliableValue}
              fldHelp={false}
              lblTopLblSrc="The app and it's contents are reliable"
              lblTopLblFor="reliable"
            />
            <SliderForm
              fieldSliderValue={overallValue}
              fldHelp={false}
              lblTopLblSrc="The overall app experience"
              lblTopLblFor="overall"
            />
            <TextareaForm
              fldHelpHelpRSrc={sugCount}
              fieldOnChange={sugChange}
              fldHelpHelpR={true}
              lblTopLblSrc="Additional comments or suggestions"
              fldHelpHelpLSrc="please provide details"
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
