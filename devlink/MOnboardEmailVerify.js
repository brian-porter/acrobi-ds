"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import { Snackbar } from "./Snackbar";
import { Spacer } from "./Spacer";
import { Headline } from "./Headline";
import { ButtonPanel } from "./ButtonPanel";
import { Paragraph } from "./Paragraph";
import { MessageAction } from "./MessageAction";
import { Hero } from "./Hero";
import * as _utils from "./utils";
import _styles from "./MOnboardEmailVerify.module.css";

export function MOnboardEmailVerify({
  as: _Component = _Builtin.FormWrapper,
  signUpEmailVerify = true,
  sb = false,
  sbTxtSrc = "Please verify your account with the email sent you",
  sbStyle = "error",
  titleSrc = "Email Sent",
  subtxtSrc = 'Please check for a "Verify Email" link from us in your email inbox',
  bodySrc = "If you don’t find the email we sent please make sure to check your spam folder or potentially another email account.",
  prevBtn = false,
  prevClick = {},
  appBtn = true,
  appBtnClick = {},
  nextBtn = true,
  nextBtnStyl = "nl",
  nextBtnDisabled = "false",
  nextBtnClick = {},
  resend = true,
  resendTxtSrc = "Resend It",
  resendTxtClr = "f500",
  resendClick = {},
}) {
  return signUpEmailVerify ? (
    <_Component
      className={_utils.cx(_styles, "onboarding")}
      id="sign-up-email-sent"
    >
      <_Builtin.FormForm
        className={_utils.cx(_styles, "dialog-wrap")}
        name="wf-form-Sign-Up-Email-Sent"
        data-name="Sign Up Email Sent"
        method="get"
        id="wf-form-Sign-Up-Email-Sent"
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
        <Snackbar
          sb={sb}
          sbTxtSrc={sbTxtSrc}
          sbBtn={true}
          sbBtnTxtSrc="Open Email"
          sbStyle="success"
          sbIcn={true}
          sbIcnSrc="email"
        />
        <_Builtin.Block className={_utils.cx(_styles, "dialog-main")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fg-dock-btm")}
            tag="div"
            data-bg-clr="fg50"
          >
            <Spacer szDep="8" size="8" />
            <Headline
              subtxtSrc={subtxtSrc}
              titleSrc={titleSrc}
              titleShdw=""
              subTxtShdw=""
              align="c"
            />
            <Spacer szDep="16" size="16" />
            <ButtonPanel
              btn1Click={appBtnClick}
              btn2Click={nextBtnClick}
              btn2={nextBtn}
              btn1={appBtn}
              btn2Disabled={nextBtnDisabled}
              btn2Styl={nextBtnStyl}
              btn3={false}
              btn1Act="next-btn"
              btn1TxtSrc="Open My Email App"
              isMultiStep=""
              btn2TxtSrc="Next"
              btn1Disabled="false"
            />
            <Paragraph
              bodySrc={bodySrc}
              align="c"
              fontClr="n700"
              pgrph={true}
              txtShad=""
            />
            <MessageAction
              msgClick={resendClick}
              txtClr={resendTxtClr}
              actTxtSrc={resendTxtSrc}
              msg={resend}
              msgTxtSrc="Didn't get an email?"
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
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664d0435454dd7c6789aed9f_amer-woman-mail.avif"
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
