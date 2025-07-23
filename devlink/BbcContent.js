"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Chiclet } from "./Chiclet";
import { Avatar } from "./Avatar";
import { TextfieldCtrl } from "./TextfieldCtrl";
import { SegBtnCtrl } from "./SegBtnCtrl";
import { BbcNav } from "./BbcNav";
import * as _utils from "./utils";
import _styles from "./BbcContent.module.css";

export function BbcContent({
  as: _Component = _Builtin.Block,
  content = true,
  lBack = true,
  lProfile = false,
  lAction = false,
  lDown = false,
  lBackIcnSrc = "Nav_left",
  pNavMap,
  tSignIn = false,
  tSignInClick = {},
  lBackClr = "n700",
  lBackStyl = "nl",
  lBackClick = {},
  lProfBdg = false,
  lProfAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  lProfAvtrAlt = "__wf_reserved_inherit",
  lProfClick = {},
  lActionIcnSrc = "Search",
  lActionClick = {},
  lDownIcnSrc = "stepper_down",
  lDownLblClr = "p500",
  lDownClick = {},
  lChicMulti,
  pMarketing = false,
  pMarketing2 = false,
  pExampleNav = true,
  tAction = true,
  exampleLvl1 = true,
  exampleSegBtn = false,
  exampleField = false,
}) {
  return content ? (
    <_Component className={_utils.cx(_styles, "bbc_wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "bbc_main")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "bbc_lead")} tag="div">
          {lDown ? (
            <_Builtin.Block className={_utils.cx(_styles, "bbc_l2")} tag="div">
              <Chiclet
                chicClick={lActionClick}
                chiclet={lAction}
                lblIcnSrc={lActionIcnSrc}
                chicSz="l"
                lblIcn={true}
                lblTxt={false}
                lblTxtSrc="Done"
                chicStyl="nt"
                lblClr="n500"
                lblSz="r1"
              />
              <Chiclet
                lblIcnSrc={lDownIcnSrc}
                lblClr={lDownLblClr}
                chicClick={lDownClick}
                lblSz="r3"
                lbl={true}
                chicSz="l"
                chicStyl="nt"
                chicMulti=""
                chiclet={true}
              />
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block className={_utils.cx(_styles, "bbc_l1")} tag="div">
            <Chiclet
              lblIcnSrc={lBackIcnSrc}
              lblClr={lBackClr}
              chicStyl={lBackStyl}
              chicMulti={lChicMulti}
              chicClick={lBackClick}
              chiclet={lBack}
              lblSz="r3"
              lbl={true}
              chicSz="l"
            />
            {lProfile ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "bbc_profile")}
                tag="div"
                data-chic-size="l"
                data-chic-style="nl"
                role="button"
                x-disabled="false"
                data-chic-active="false"
                data-chic-multi=""
                {...lProfClick}
              >
                <Avatar
                  avtrSrc={lProfAvtrSrc}
                  avtrAlt={lProfAvtrAlt}
                  bdg={lProfBdg}
                  avtrShape="c"
                  bdgSz="s"
                  bdgTxt={false}
                />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "bbc_prime")} tag="div">
          {pNavMap ??
            (pExampleNav ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "example-bbc")}
                tag="div"
              >
                {exampleField ? (
                  <_Builtin.FormWrapper
                    className={_utils.cx(_styles, "bbc_input-field")}
                  >
                    <_Builtin.FormForm
                      className={_utils.cx(_styles, "input-form")}
                      name="wf-form-"
                      method="get"
                    >
                      <TextfieldCtrl
                        fldBtn={true}
                        fldIcn={true}
                        fldIcnSrc="Search"
                        fldIcnDisp="l"
                        fldTxt={true}
                        fldClick={{}}
                        onChange=""
                        fldBtnIcnSrc="mic"
                        fldBtnClick={{}}
                        fldPholdSrcX="Placeholder"
                      />
                    </_Builtin.FormForm>
                    <_Builtin.FormSuccessMessage />
                    <_Builtin.FormErrorMessage />
                  </_Builtin.FormWrapper>
                ) : null}
                <SegBtnCtrl
                  segBtn={exampleSegBtn}
                  btn1Btn1TxtSrc="All"
                  btn1Btn1Txt={true}
                  btn1Btn1Icn={false}
                  btn2Btn2Txt={false}
                  btn2Btn2TxtSrc="Images"
                  btn2Btn2IcnSrc="graphic"
                  btn3Btn3Txt={false}
                  btn3Btn3TxtSrc="Video"
                  btn3Btn3IcnSrc="vid"
                  btn4={false}
                  btn4Btn4Txt={false}
                  btn4Btn4TxtSrc="Scan"
                  btn4Btn4IcnSrc="qr_scan"
                  btn1Btn1Actv="true"
                  btn1Btn1Click={{}}
                  btn2Btn2Actv=""
                  btn2Btn2Click={{}}
                  btn3Btn3Actv=""
                  btn3Btn3Click={{}}
                  btn4Btn4Actv=""
                  btn4Btn4Click={{}}
                  segBtnClr=""
                  btn3={true}
                  btn1={true}
                  btn2={true}
                  btn1Btn1IcnSrc="default"
                  btn2Btn2Icn={true}
                  btn3Btn3Icn={true}
                  btn4Btn4Icn={true}
                  btn5={false}
                  btn5Btn5Actv=""
                  btn5Btn5Icn={true}
                  btn5Btn5Txt={true}
                  btn5Btn5TxtSrc="Bookmark"
                  btn5Btn5IcnSrc="bookmark"
                  btn5Btn5Click={{}}
                />
                <BbcNav exampleNav={pExampleNav} marketing={pMarketing2} />
              </_Builtin.Block>
            ) : null)}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  ) : null;
}
