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
import _styles from "./MFeedbackProd.module.css";

export function MFeedbackProd({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  goalValue = "0",
  stableValue = "0",
  securityValue = "0",
  integrationValue = "0",
  goalsChange,
  goalsCount = "0/500",
  useChange,
  useCount = "0/500",
  badChange,
  badCount = "0/500",
  likeChange,
  likeCount = "0/500",
  doClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-fb")}
      tag="section"
      id="Feedback-Product"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          titleSrc="Product Feedback"
          sz="m"
          titleSz="h4"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <Message
          icn={false}
          titleSrc=""
          bodySrc="From 0 being horrible, to excellent with a 100%."
          bodyClr="n700"
        />
        <_Builtin.FormWrapper className={_utils.cx(_styles, "form-share")}>
          <_Builtin.FormForm
            name="wf-form-Product-Feedback"
            data-name="Product Feedback"
            method="get"
            id="wf-form-Product-Feedback"
          >
            <SliderForm
              fieldSliderValue={goalValue}
              lblTopLblSrc="The app solved my problem / I achieved my goal"
              fldHelp={false}
            />
            <SliderForm
              fieldSliderValue={stableValue}
              fldHelp={false}
              lblTopLblSrc="The app was stable and didn't crash"
            />
            <SliderForm
              fieldSliderValue={securityValue}
              fldHelp={false}
              lblTopLblSrc="The security of the app is what I'd expect"
            />
            <SliderForm
              fieldSliderValue={integrationValue}
              fldHelp={false}
              lblTopLblSrc="Integration with other services is good"
            />
            <TextareaForm
              fldHelpHelpRSrc={goalsCount}
              fieldOnChange={goalsChange}
              lblTopLblSrc="What goal(s) are you trying to achieve?"
              fldHelpHelpR={true}
              fldHelpHelpLSrc="please provide details"
              lblTopLblFor="goals"
              fieldFldId="goals"
              fieldFldName="goals"
            />
            <TextareaForm
              fldHelpHelpRSrc={useCount}
              fieldOnChange={useChange}
              fldHelpHelpR={true}
              lblTopLblSrc="What would prompt you to use the app?"
              fldHelpHelpLSrc="please provide details"
              lblTopLblFor="use"
              fieldFldId="use"
              fieldFldName="use"
            />
            <TextareaForm
              fldHelpHelpRSrc={badCount}
              fieldOnChange={badChange}
              fldHelpHelpR={true}
              lblTopLblSrc="What features didn't work as expected?"
              fldHelpHelpLSrc="please provide details"
              lblTopLblFor="bad"
              fieldFldId="bad"
              fieldFldName="bad"
            />
            <TextareaForm
              fldHelpHelpRSrc={likeCount}
              fieldOnChange={likeChange}
              fldHelpHelpLSrc="please provide details"
              fldHelpHelpL={true}
              lblTopLblSrc="Are there any features you'd like to see?"
              fldHelpHelpR={true}
              lblTopLblFor="like"
              fieldFldId="like"
              fieldFldName="like"
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
