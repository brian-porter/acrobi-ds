"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonPanel } from "./ButtonPanel";
import { Spacer } from "./Spacer";
import * as _utils from "./utils";
import _styles from "./MAuthTerms.module.css";

export function MAuthTerms({
  as: _Component = _Builtin.Block,
  codeEmbed = true,
  termsMap,
  backBtnClick = {},
  acceptBtnClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "onboarding2")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "terms-height")} tag="div">
        {termsMap ??
          (codeEmbed ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "code-embed")}
              value="%3Ciframe%20style%3D%22border%3Anone%3B%22%20src%3D%22https%3A%2F%2Fapp.termly.io%2Fdocument%2Fterms-of-service%2Fa6941a3c-79ed-437c-9a6d-0e0f7ca7049b%22%20width%3D%22100%25%22%20height%3D%22100%25%22%3E%3C%2Fiframe%3E"
            />
          ) : null)}
      </_Builtin.Block>
      <ButtonPanel
        btn1Click={backBtnClick}
        btn2Click={acceptBtnClick}
        btn3={false}
        btn2={true}
        btn1TxtSrc="Back"
        btn1Styl="nl"
        isMultiStep=""
        btn1Disabled="false"
        btnPnlOri="h"
        btn2TxtSrc="Accept"
        btn2Styl="pf"
        btn2Sz="l"
      />
      <Spacer szDep="8" size="8" />
    </_Component>
  );
}
