"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { Message } from "./Message";
import { SliderForm } from "./SliderForm";
import { TextfieldForm } from "./TextfieldForm";
import { TextareaForm } from "./TextareaForm";
import { ButtonPanel } from "./ButtonPanel";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MFeedbackMarket.module.css";

export function MFeedbackMarket({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  priceValue = "0",
  valueValue = "0",
  compValue = "0",
  payChange,
  altsChange,
  altsCount = "0/500",
  findChange,
  findCount = "0/500",
  sugChange,
  sugCount = "0/500",
  doClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-fb")}
      tag="section"
      id="Feedback-Market"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          titleSrc="Market Research"
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
            name="wf-form-Market-Research"
            data-name="Market Research"
            method="get"
            id="wf-form-Market-Research"
          >
            <SliderForm
              fieldSliderValue={priceValue}
              lblTopLblSrc="Pricing is clear and easy to understand?"
              fldHelp={false}
              lblTopLblFor="price"
            />
            <SliderForm
              fieldSliderValue={valueValue}
              lblTopLblSrc="How would you rate the app's value for the money?"
              fldHelp={false}
              lblTopLblFor="value"
            />
            <SliderForm
              fieldSliderValue={compValue}
              fldHelp={false}
              lblTopLblSrc="This app is better than the competitors?"
              lblTopLblFor="comp"
            />
            <TextfieldForm
              fieldOnChange={payChange}
              lblTopLblSrc="What would you pay for this app?"
              fldHelp={false}
              lblTopLblFor="pay"
              fieldFldId="pay"
              fieldFldName="pay"
            />
            <TextareaForm
              fldHelpHelpRSrc={altsCount}
              fieldOnChange={altsChange}
              fldHelpHelpR={true}
              lblTopLblSrc="What alternatives to the app are you considering?"
              fldHelpHelpLSrc="please provide details"
              lblTopLblFor="alts"
              fieldFldId="alts"
              fieldFldName="alts"
            />
            <TextareaForm
              fldHelpHelpRSrc={findCount}
              fieldOnChange={findChange}
              fldHelpHelpR={true}
              lblTopLblSrc="How did you find out about the app?"
              fldHelpHelpLSrc="please provide details"
              lblTopLblFor="find"
              fieldFldId="find"
              fieldFldName="find"
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
