"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ListItmCtrl } from "./ListItmCtrl";
import { Message } from "./Message";
import { TextfieldForm } from "./TextfieldForm";
import { Spacer } from "./Spacer";
import { ButtonPanel } from "./ButtonPanel";
import * as _utils from "./utils";
import _styles from "./MArchive.module.css";

export function MArchive({
  as: _Component = _Builtin.Block,
  headSrc = "Archive",
  act1TxtSrc = "Archive",

  act1Link = {
    href: "#",
  },

  objName = "ObjectTitle",
  objSubtxt = "subtext",
  objImg = true,
  objImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  objAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c791c_me_280.avif",
  objAvtr = false,
  msgTitleSrc = "Warning: You're about to archive this {ObjectType}",
  msgBodySrc = "This {ObjectType} will be stored in the archives where you can later restore it. Confirm above to remove.",
  btnLabel = "Cancel",
  passConf = true,
  btn1Click = {},
  act1Click = {},
  passChange,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-archive")}
      tag="section"
      id="Delete"
    >
      <SecHead
        titleSrc={headSrc}
        act1TxtSrc={act1TxtSrc}
        act1Click={act1Click}
        act1Styl="wt"
        titleSz="h4"
        sz="xl"
      />
      <ListItmCtrl
        lLAvtr={objAvtr}
        pPSubtxtSrc={objSubtxt}
        pPTitleSrc={objName}
        lLImg={objImg}
        lLImgSrc={objImgSrc}
        lLImgSz="l"
      />
      <Message
        bodySrc={msgBodySrc}
        titleSrc={msgTitleSrc}
        icnSrc="Stop"
        icnClr="fw500"
      />
      {passConf ? (
        <_Builtin.FormWrapper className={_utils.cx(_styles, "form-pass")}>
          <_Builtin.FormForm
            name="wf-form-Archive-Pass"
            data-name="Archive Pass"
            method="get"
            id="wf-form-Archive-Pass"
          >
            <TextfieldForm
              fieldOnChange={passChange}
              lblTopLblSrc="Password"
              fieldFldIcnSrc="pincode"
              fieldFldIcn={true}
              fieldFldIcnDisp="l"
              fieldFldBtnIcnSrc="view"
              fldHelp={false}
              fieldFldBtn={true}
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
        </_Builtin.FormWrapper>
      ) : null}
      <Spacer szDep="24" size="24" />
      <ButtonPanel
        btn1TxtSrc={btnLabel}
        btn1Click={btn1Click}
        btn2={false}
        btn3={false}
      />
      <Spacer size="16" />
    </_Component>
  );
}
