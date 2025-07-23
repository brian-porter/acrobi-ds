"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import { Snackbar } from "./Snackbar";
import { Spacer } from "./Spacer";
import { Headline } from "./Headline";
import { TextfieldForm } from "./TextfieldForm";
import { ButtonPanel } from "./ButtonPanel";
import { MessageAction } from "./MessageAction";
import { Hero } from "./Hero";
import * as _utils from "./utils";
import _styles from "./MOnboardPhoneVerify.module.css";

export function MOnboardPhoneVerify({
  as: _Component = _Builtin.FormWrapper,
  signUpPhoneVerify = true,
  resendTxtClr = "n300",
  codeFbk = false,
  codeFldBrdClr,
  codeFbkTxtSrc = "Feedback here",
  sb = false,
  sbTxtSrc = "Snackbar message goes here and wraps to a second line with trucation",
  sbStyle = "error",
  doBtnClick = {},
  resendClick = {},
  resendTxtSrc = "Resend in {xx} sec.",
  prevClick = {},
  prevBtn = false,
  codeOnChange,
}) {
  return signUpPhoneVerify ? (
    <_Component
      className={_utils.cx(_styles, "onboarding")}
      id="sign-up-phone-verify"
    >
      <_Builtin.FormForm
        className={_utils.cx(_styles, "dialog-wrap")}
        name="wf-form-Sign-Up-Phone-Verify"
        data-name="Sign Up Phone Verify"
        method="get"
        id="wf-form-Sign-Up-Phone-Verify"
      >
        {prevBtn ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "dialog_prev-btn")}
            tag="div"
          >
            <Button
              btnClick={prevClick}
              btnStyl="nt"
              btnTxt={false}
              btnTxtSrc="Back"
              btnSz="l"
              btnIcnSrc="nav_left_f"
              lblClr="n500"
            />
          </_Builtin.Block>
        ) : null}
        <Snackbar sb={sb} sbTxtSrc={sbTxtSrc} sbBtn={false} />
        <_Builtin.Block className={_utils.cx(_styles, "dialog-main")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fg-dock-btm")}
            tag="div"
            data-bg-clr="fg50"
          >
            <Spacer szDep="8" size="8" />
            <Headline
              subtxtSrc="Please check your phone for a verification code"
              titleSrc="Text Message Sent"
              titleShdw=""
              subTxtShdw=""
              align="c"
            />
            <TextfieldForm
              fbk={codeFbk}
              fieldFldBrdClr={codeFldBrdClr}
              fbkFbkTxtSrc={codeFbkTxtSrc}
              fieldOnChange={codeOnChange}
              lblTopLblSrc="Verification Code"
              fieldTabOrder="1"
              fldHelp={false}
              fieldFldPlaceholderSrc="Enter code"
            />
            <ButtonPanel
              btn1Click={doBtnClick}
              btn3={false}
              btn2={false}
              btn1Act="next-btn"
              btn1TxtSrc="Verify"
              isMultiStep=""
            />
            <MessageAction
              msgClick={resendClick}
              txtClr={resendTxtClr}
              actTxtSrc={resendTxtSrc}
              msgTxtSrc="Didn't get a code?"
              msgId="Resend Link"
              txtShad=""
              ctaTxtShad=""
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
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664cfd40ebf0715a6b241e23_india-amer-shop3.avif"
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
  ) : null;
}
