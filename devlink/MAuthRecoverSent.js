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
import _styles from "./MAuthRecoverSent.module.css";

export function MAuthRecoverSent({
  as: _Component = _Builtin.FormWrapper,
  recoverSent = true,
  openAppBtnClick = {},
  resendTxtClr = "n300",
  resendBtnClick = {},
  sb = false,
  sbTxtSrc = "Snackbar message goes here and wraps to a second line with trucation",
  sbStyle = "error",
  resendTxtSrc = "Resend in {xx} sec.",
}) {
  return recoverSent ? (
    <_Component className={_utils.cx(_styles, "onboarding")} id="recoversent">
      <_Builtin.FormForm
        className={_utils.cx(_styles, "dialog-wrap")}
        name="wf-form-Recover-Email-Sent"
        data-name="Recover Email Sent"
        method="get"
        id="wf-form-Recover-Email-Sent"
      >
        <Snackbar sb={sb} sbTxtSrc={sbTxtSrc} sbBtn={false} />
        <_Builtin.Block className={_utils.cx(_styles, "dialog-main")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fg-dock-btm")}
            tag="div"
            data-bg-clr="fg50"
          >
            <Spacer szDep="8" size="8" />
            <Headline
              titleSrc="Email Sent"
              subtxtSrc='Please check your inbox for a "Reset Password" link from us'
              titleShdw=""
              subTxtShdw=""
              align="c"
            />
            <Spacer szDep="32" size="32" />
            <ButtonPanel
              btn1Click={openAppBtnClick}
              btn3={false}
              btn2={false}
              btn1TxtSrc="Open My Email App"
              btn1Styl="pf"
            />
            <Paragraph
              align="l"
              bodySrc="Not finding the email we sent? Please check your spam folder or potentially another email account."
              fontClr="n700"
              fontSz="r3"
              txtShad=""
            />
            <MessageAction
              msgClick={resendBtnClick}
              txtClr={resendTxtClr}
              actTxtSrc={resendTxtSrc}
              msgTxtSrc="Didn't get an email?"
              msgId="resend"
              txtShad=""
              ctaTxtShad="n"
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
