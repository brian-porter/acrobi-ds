"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Snackbar } from "./Snackbar";
import { Spacer } from "./Spacer";
import { Headline } from "./Headline";
import { TextfieldForm } from "./TextfieldForm";
import { ButtonPanel } from "./ButtonPanel";
import { MessageAction } from "./MessageAction";
import { Paragraph } from "./Paragraph";
import { Hero } from "./Hero";
import * as _utils from "./utils";
import _styles from "./MAuthSignIn.module.css";

export function MAuthSignIn({
  as: _Component = _Builtin.FormWrapper,
  signIn = true,
  emailOnChange,
  passOnChange,
  passFldType,
  passFldBtnIcnSrc = "view_pass",
  passFldBtnClick = {},
  signInBtnDisabled = "false",
  signInBtnClick = {},
  helpBtnClick = {},
  signUpBtnClick = {},
  emailFbk = true,
  emailFbkTxtSrc = "Feedback here",
  emailFldBrdClr,
  passFbk = false,
  passFldBrdClr,
  passFbkTxtSrc = "Feedback here",
  sb = false,
  sbTxtSrc = "Snackbar message goes here and wraps to a second line with trucation",
  sbStyle = "error",
}) {
  return signIn ? (
    <_Component className={_utils.cx(_styles, "step-signin")} id="sign-in">
      <_Builtin.FormForm
        className={_utils.cx(_styles, "dialog-wrap")}
        name="wf-form-Sign-In-2"
        data-name="Sign In"
        method="get"
      >
        <_Builtin.Block className={_utils.cx(_styles, "dialog-main")} tag="div">
          <Snackbar sb={sb} sbTxtSrc={sbTxtSrc} sbBtn={false} />
          <_Builtin.Block
            className={_utils.cx(_styles, "fg-dock-btm")}
            tag="div"
            data-bg-clr="fg50"
          >
            <Spacer szDep="8" size="8" />
            <Headline
              titleSrc="Open Says Me"
              subtxtSrc="Secure Account Access"
              titleShdw="fg"
              subTxtShdw="fg"
              align=""
              titleLc=""
              titleAlign="c"
              subtxtAlign="c"
            />
            <TextfieldForm
              fieldOnChange={emailOnChange}
              fbk={emailFbk}
              fbkFbkTxtSrc={emailFbkTxtSrc}
              fieldFldBrdClr={emailFldBrdClr}
              lblTopLblSrc="Email or Phone"
              fldHelp={false}
              fieldFldPlaceholderSrc="jane@domain.com"
              fbkFbkTxt={false}
              fieldFldId="username"
              lblTopLblFor="username"
              lblTopLblShdw="fg"
            />
            <TextfieldForm
              fieldOnChange={passOnChange}
              fbk={passFbk}
              fieldFldBrdClr={passFldBrdClr}
              fbkFbkTxtSrc={passFbkTxtSrc}
              fieldFldBtnClick={passFldBtnClick}
              fieldFldBtnIcnSrc={passFldBtnIcnSrc}
              fieldFldType={passFldType}
              lblTopLblSrc="Password"
              fldHelp={false}
              fieldFldPlaceholderSrc="secret"
              fieldFldBtn={true}
              fieldFldId="password"
              lblTopLblFor="password"
              lblTopLblShdw="fg"
            />
            <ButtonPanel
              btn1Click={signInBtnClick}
              btn1Disabled={signInBtnDisabled}
              btn3={false}
              btn2={false}
              btn1TxtSrc="Sign In"
              btn1Styl="pf"
              isMultiStep=""
            />
            <MessageAction
              msgClick={helpBtnClick}
              msgTxtSrc="Forgot your sign in details?"
              actTxtSrc="Get help"
              msgId="Get Help"
              txtShad="fg"
              ctaTxtShad="fg"
            />
            <Paragraph
              fontSz="r2"
              align="c"
              bodySrc="OR"
              txtShad="fg"
              pgrph={true}
            />
            <ButtonPanel
              btn2Click={signUpBtnClick}
              btn2={true}
              btn2Styl="pl"
              btn2TxtSrc="Sign Up"
              btn2Id="sign-up"
              btn3={false}
              btn1={false}
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
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6615874d69350a12907e74fc_SignIn3.avif"
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
