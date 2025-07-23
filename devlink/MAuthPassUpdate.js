"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Spacer } from "./Spacer";
import { Headline } from "./Headline";
import { TextfieldForm } from "./TextfieldForm";
import { ButtonPanel } from "./ButtonPanel";
import { MessageAction } from "./MessageAction";
import { Hero } from "./Hero";
import { Snackbar } from "./Snackbar";
import * as _utils from "./utils";
import _styles from "./MAuthPassUpdate.module.css";

export function MAuthPassUpdate({
  as: _Component = _Builtin.FormWrapper,
  updatePass = true,
  emailOnChange,
  emailFbk = false,
  emailFldBrdClr,
  emailFldType = "email",
  emailReadOnly = "true",
  emailAutoFocus = "false",
  emailFbkTxtSrc = "Feedback here",
  codeFldBrdClr,
  codeFldType = "text",
  codeOnChange,
  codeHelpL = true,
  codeHelpLSrc = "sent to your email",
  codeFbk = false,
  codeFbkTxtSrc = "Feedback here",
  newPassFldType = "password",
  newPassFldBtnIcnSrc = "view_pass",
  newPassOnChange,
  newPassFldBtnClick = {},
  newPassFbk = false,
  newPassFldBrdClr,
  newPassFbkTxtSrc = "Feedback here",
  doClick = {},
  resendTxtSrc = "Resend in {xx} sec.",
  resendTxtClr = "n300",
  resendBtnClick = {},
  sb = false,
  sbStyle = "success",
  sbTxtSrc = "Email sent, please verify your account with the enclosed code",
  sbBtnClick = {},
}) {
  return updatePass ? (
    <_Component className={_utils.cx(_styles, "onboarding")}>
      <_Builtin.FormForm
        className={_utils.cx(_styles, "dialog-wrap")}
        name="wf-form-"
        method="get"
        id="wf-form-"
      >
        <_Builtin.Block className={_utils.cx(_styles, "dialog-main")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fg-dock-btm")}
            tag="div"
            data-bg-clr="fg50"
          >
            <Spacer szDep="8" size="8" />
            <Headline
              titleSrc="Update Password"
              subtxtSrc="To confirm, we've sent you an email with a validation code"
              subTxtShdw="fg"
              titleShdw="fg"
              align="c"
            />
            <TextfieldForm
              fieldOnChange={emailOnChange}
              fbk={emailFbk}
              fbkFbkTxtSrc={emailFbkTxtSrc}
              fieldFldBrdClr={emailFldBrdClr}
              fieldReadOnly={emailReadOnly}
              lblTopLblSrc="Email"
              fldHelp={false}
              fieldFldPlaceholderSrc="jane@domain.com"
              fieldFldBtnIcnSrc="hide_pass"
              fieldFldId="email"
              fieldFldName="email"
              lblTopLblFor="email"
              fldHelpHelpR={false}
              lblTopLblShdw="fg"
              fieldFldType="email"
            />
            <TextfieldForm
              fieldOnChange={codeOnChange}
              fbk={codeFbk}
              fieldFldBrdClr={codeFldBrdClr}
              fbkFbkTxtSrc={codeFbkTxtSrc}
              fldHelpHelpLSrc={codeHelpLSrc}
              fldHelpHelpL={codeHelpL}
              lblTopLblSrc="Validation Code"
              fieldFldPlaceholderSrc="secret"
              fieldFldBtnIcnSrc="view_pass"
              fieldFldId="code"
              fieldFldName="code"
              fieldFldBtnClick={{}}
              lblTopLblFor="code"
              fldHelpHelpShdw="fg"
              lblTopLblShdw="fg"
              fieldFldType="number"
            />
            <TextfieldForm
              fieldOnChange={newPassOnChange}
              fbk={newPassFbk}
              fieldFldBrdClr={newPassFldBrdClr}
              fbkFbkTxtSrc={newPassFbkTxtSrc}
              fieldFldBtnIcnSrc={newPassFldBtnIcnSrc}
              fieldFldBtnClick={newPassFldBtnClick}
              lblTopLblSrc="New Password"
              fieldFldPlaceholderSrc="secret"
              fieldFldBtn={true}
              fieldFldId="newpass"
              fieldFldName="newpass"
              fldHelpHelpLSrc="8 characters using numbers, symbols, upper & lower case"
              lblTopLblFor="newpass"
              lblTop={true}
              fldHelp={true}
              fldHelpHelpR={false}
              fldHelpHelpShdw="fg"
              lblTopLblShdw="fg"
              fieldFldType="password"
            />
            <ButtonPanel
              btn1Click={doClick}
              btn3={false}
              btn2={false}
              btn1TxtSrc="Done"
              btn1Styl="pf"
              isMultiStep=""
              btn1Disabled="false"
            />
            <MessageAction
              msgClick={resendBtnClick}
              txtClr={resendTxtClr}
              actTxtSrc={resendTxtSrc}
              msgTxtSrc="Didn't get an email?"
              msgId="resend"
              txtShad="fg"
              ctaTxtShad="fg"
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
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/66560ad32f9ef6405d80eee7_mideast-amer-woman-wall4.avif"
          />
        </_Builtin.Block>
        <Snackbar
          sb={sb}
          sbTxtSrc={sbTxtSrc}
          sbStyle={sbStyle}
          sbBtnClick={sbBtnClick}
          sbBtn={true}
          sbIcn={true}
          sbIcnSrc="email"
          sbBtnTxtSrc="Open Email"
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
    </_Component>
  ) : null;
}
