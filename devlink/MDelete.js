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
import _styles from "./MDelete.module.css";

export function MDelete({
  as: _Component = _Builtin.Block,
  remove = true,
  headSrc = "Please confirm",
  msgTitleSrc = "Are you sure? You're about to delete this {ObjectType}",
  msgBodySrc = "This can not be reversed. Continue and you'll remove this {ObjectType} and its contents forever.",
  objName = "ObjectName",
  objSubtxt = "subtxt",
  objImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  objAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c791c_me_280.avif",
  objAvtr = false,
  objImg = true,
  passConf = true,
  act1TxtSrc = "Delete",

  act1Link = {
    href: "#",
  },

  icnSrc = "Stop",
  act1Styl = "dt",
  cancelClick = {},
  act1Click = {},
  btn1TxtSrc = "Cancel",
  passFldBtnIcnSrc = "view_pass",
  passFldBtnClick = {},
  passChange,
}) {
  return remove ? (
    <_Component
      className={_utils.cx(_styles, "g-delete")}
      tag="section"
      id="Delete"
    >
      <SecHead
        titleSrc={headSrc}
        act1TxtSrc={act1TxtSrc}
        act1Styl={act1Styl}
        act1Click={act1Click}
        sz="xl"
        titleSz="h4"
      />
      <ListItmCtrl
        lLAvtr={objAvtr}
        pPTitleSrc={objName}
        pPSubtxtSrc={objSubtxt}
        lLImg={objImg}
        lLImgSrc={objImgSrc}
        lLAvtrSz="l"
        lLAdptSz="l"
      />
      <Message
        bodySrc={msgBodySrc}
        titleSrc={msgTitleSrc}
        icnSrc={icnSrc}
        icnClr="fd500"
      />
      {passConf ? (
        <_Builtin.FormWrapper className={_utils.cx(_styles, "form-pass")}>
          <_Builtin.FormForm
            name="wf-form-Delete"
            data-name="Delete"
            method="get"
            id="wf-form-Delete"
          >
            <TextfieldForm
              fieldFldBtnIcnSrc={passFldBtnIcnSrc}
              fieldFldBtnClick={passFldBtnClick}
              fieldOnChange={passChange}
              lblTopLblSrc="Password"
              fieldFldIcnSrc="pincode"
              fieldFldIcn={true}
              fieldFldIcnDisp="l"
              fldHelp={false}
              fieldFldBtn={true}
              fbkFbkIcnSrc="check_circle"
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
        btn1TxtSrc={btn1TxtSrc}
        btn1Click={cancelClick}
        btn2={false}
        btn3={false}
      />
    </_Component>
  ) : null;
}
