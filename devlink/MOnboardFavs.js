"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import { Snackbar } from "./Snackbar";
import { Spacer } from "./Spacer";
import { Headline } from "./Headline";
import { TabsSegBtn } from "./TabsSegBtn";
import { ButtonPanel } from "./ButtonPanel";
import { Paragraph } from "./Paragraph";
import { Hero } from "./Hero";
import * as _utils from "./utils";
import _styles from "./MOnboardFavs.module.css";

export function MOnboardFavs({
  as: _Component = _Builtin.FormWrapper,
  shareBtnClick = {},
  doBtnClick = {},
  signUpFavs = true,
  sb = false,
  sbTxtSrc = "Snackbar message goes here and wraps to a second line with trucation",
  sbStyle = "error",
  prevClick = {},
}) {
  return signUpFavs ? (
    <_Component className={_utils.cx(_styles, "onboarding")} id="sign-up-favs">
      <_Builtin.FormForm
        className={_utils.cx(_styles, "dialog-wrap")}
        name="wf-form-Sign-Up-Favs"
        data-name="Sign Up Favs"
        method="get"
        id="wf-form-Sign-Up-Favs"
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
              titleShdw=""
              subTxtShdw=""
              subtxtSrc="For the best experience select your favorite stores, brands, and places"
              titleSrc="Get Personal"
              align="c"
            />
            <Spacer szDep="8" size="8" />
            <_Builtin.Block
              className={_utils.cx(_styles, "sec-personalize")}
              tag="div"
            >
              <TabsSegBtn
                btn1Icn={true}
                btn1TxtSrc=""
                btn1IcnSrc="store"
                btn2Icn={true}
                btn2TxtSrc=""
                btn2IcnSrc="brands"
                segBtn3={true}
                btn3Icn={true}
                btn3TxtSrc="Places"
                btn3IcnSrc="places"
                segBtn4={false}
              />
            </_Builtin.Block>
            <ButtonPanel
              btn1Click={shareBtnClick}
              btn2Click={doBtnClick}
              btn3={false}
              btn2={true}
              btn1Act=""
              btn1TxtSrc="Share My Location"
              btn1Id=""
              btn1Styl="ft"
              btn2Styl="pf"
              btn2TxtSrc="Next"
              btnPnlOri="h"
              btn1Icn={true}
              btn1IcnSrc="geo_myloc"
            />
            <Paragraph
              bodySrc="Sharing your location will give more relevant options"
              align="c"
              txtShad=""
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
            imgSrc="https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/664cfd418db47a2fa8891247_mideast-amer-shop2.avif"
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
