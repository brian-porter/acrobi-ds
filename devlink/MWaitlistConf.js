"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import { Snackbar } from "./Snackbar";
import { Spacer } from "./Spacer";
import { Headline } from "./Headline";
import { TextfieldForm } from "./TextfieldForm";
import { ButtonPanel } from "./ButtonPanel";
import { Hero } from "./Hero";
import * as _utils from "./utils";
import _styles from "./MWaitlistConf.module.css";

export function MWaitlistConf({
  as: _Component = _Builtin.FormWrapper,
  linkFldClick = {},
  tweetClick = {},
  metaClick = {},
  smsClick = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "step-waitlist-conf")}
      id="waillist-conf"
    >
      <_Builtin.FormForm
        className={_utils.cx(_styles, "dialog-wrap")}
        name="wf-form-Waitlist-Confirm"
        data-name="Waitlist Confirm"
        method="get"
        id="wf-form-Waitlist-Confirm"
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
              titleSrc="You're On The List!"
              subtxtSrc="Want to cut the line and get even earlier access? Refer your friends & move up the list"
              titleShdw="on"
              subTxtShdw="on"
            />
            <Spacer szDep="8" />
            <TextfieldForm
              fieldFldClick={linkFldClick}
              lblTopLblSrc="Referral Link"
              fldHelp={false}
              fieldFldPlaceholderSrc="Unique referral link"
              fbk={false}
              fieldFldBrdClr=""
              fbkFbkTxtSrc="Feedback here"
              fieldFldBtn={true}
              fieldFldBtnIcnSrc="copy"
              fieldFldName="ref-link"
              fieldTabOrder="0"
              fieldFldIcnSrc="Search"
            />
            <ButtonPanel
              btn1Click={tweetClick}
              btn2Click={metaClick}
              btn3Click={smsClick}
              btn1TxtSrc="Tweet About It"
              btn1Styl="pf"
              btn1Act="next-btn"
              btn1Icn={true}
              btn2Icn={true}
              btn3Icn={true}
              btn1IcnSrc="logo_twitter_f"
              btn2TxtSrc="Facebook Share"
              btn2IcnSrc="logo_facebook_f"
              btn3TxtSrc="Send a Message"
              btn3IcnSrc="chat_f"
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
