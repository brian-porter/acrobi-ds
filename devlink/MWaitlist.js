"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Snackbar } from "./Snackbar";
import { Spacer } from "./Spacer";
import { Headline } from "./Headline";
import { TextfieldForm } from "./TextfieldForm";
import { ButtonPanel } from "./ButtonPanel";
import { Message } from "./Message";
import { Hero } from "./Hero";
import * as _utils from "./utils";
import _styles from "./MWaitlist.module.css";

export function MWaitlist({ as: _Component = _Builtin.FormWrapper }) {
  return (
    <_Component className={_utils.cx(_styles, "step-waitlist")} id="waitlist">
      <_Builtin.FormForm
        className={_utils.cx(_styles, "dialog-wrap")}
        name="wf-form-Waitlist"
        data-name="Waitlist"
        method="get"
        id="wf-form-Waitlist"
      >
        <_Builtin.Block className={_utils.cx(_styles, "dialog-main")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fg-dock-btm")}
            tag="div"
            bg-clr="fg50"
          >
            <Snackbar
              sbBtn={false}
              sb={false}
              sbTxtSrc="Snackbar message goes here and wraps to a second line with trucation"
            />
            <Spacer szDep="8" />
            <Headline
              titleSrc="AppName Waitlist"
              subtxtSrc="Secure your spot, be an early adopter & get notified when the app is available"
              titleShdw="on"
              subTxtShdw="on"
            />
            <TextfieldForm
              lblTopLblSrc="Name"
              fldHelp={false}
              fieldOnChange=""
              fbkFbkTxtSrc="Feedback here"
              fieldFldPlaceholderSrc="First & Last Name"
              fieldFldName="Name"
              fieldAutoComp="on"
            />
            <TextfieldForm
              lblTopLblSrc="Email"
              fldHelp={false}
              fieldOnChange=""
              fbk={false}
              fbkFbkTxtSrc="Feedback here"
              fieldFldBrdClr=""
              fieldFldPlaceholderSrc="jane@domain.com"
            />
            <ButtonPanel
              btn3={false}
              btn2={false}
              btn1TxtSrc="Join Waitlist"
              btn1Styl="pf"
              isMultiStep=""
              btn1Click={{}}
              btn1Disabled="false"
            />
            <Spacer />
            <Message
              lbl={false}
              icnClr="n500"
              bodySrc="Your data is completely safe and only used to provide you with updates about the product."
              icnSz="m"
              bodyClr="n500"
              icnSrc="ss_base"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "dialog-hero")} tag="div">
          <Hero
            hline={false}
            icnBar={true}
            heroAsp="9-16"
            icnBarIcnBarR1Icn={false}
            icnBarIcnBarL1Icn={false}
            icnBarIcnBarR1Src="nav_right_f"
            icnBarIcnBarL1Click={{}}
            icnBarIcnBarR1Click={{}}
            fadeBtm={false}
          />
        </_Builtin.Block>
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
