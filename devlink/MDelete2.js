"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ListItmCtrl } from "./ListItmCtrl";
import { Message } from "./Message";
import { Spacer } from "./Spacer";
import { ButtonPanel } from "./ButtonPanel";
import { TextfieldForm } from "./TextfieldForm";
import * as _utils from "./utils";
import _styles from "./MDelete2.module.css";

export function MDelete2({
  as: _Component = _Builtin.Block,
  baseBase = false,
  baseBaseDoTxtSrc = "Delete",
  baseBaseDoClick = {},
  baseBaseObjIcn = false,
  baseBaseObjImg = true,
  baseBaseObjAvtr = false,
  baseBaseObjIcnSrc = "default",
  baseBaseObjImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  baseBaseObjImgAltTxt = "__wf_reserved_inherit",
  baseBaseObjAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  baseBaseObjAvtrAlt = "__wf_reserved_inherit",
  baseBaseObjTitleSrc = "ObjTitle",
  baseBaseObjSubtxt1Src = "ObjSubtxt",
  baseBaseMsgTitleSrc = "Are you sure? You will loose all contact.",
  baseBaseMsgIcnSrc = "Stop",
  baseBaseMsgBodySrc = "You will no longer be able to interact with them or see their activity and they will not be able to see or interact with you.",
  baseBaseCancelClick = {},
  critCrit = false,
  critCritDoTxtSrc = "Delete",
  critCritDoClr = "n500",
  critCritDoClick = {},
  critCritObjIcn = false,
  critCritObjImg = true,
  critCritObjAvtr = false,
  critCritObjIcnSrc = "default",
  critCritObjImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  critCritObjImgAltTxt = "__wf_reserved_inherit",
  critCritObjAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  critCritObjAvtrAlt = "__wf_reserved_inherit",
  critCritObjTitleSrc = "ObjTitle",
  critCritObjSubtxt1Src = "ObjSubtxt",
  critCritMsgTitleSrc = "Are you sure? You will loose all contact.",
  critCritMsgIcnSrc = "Stop",
  critCritMsgBodySrc = "You will no longer be able to interact with them or see their activity and they will not be able to see or interact with you.",
  critCritFldChange,
  critCritFldClick = {},
  critCritFldBtnClick = {},
  critCritCancelClick = {},
  recovRecov = false,
  recovRecovCancelClick = {},
  recovRecovObjIcn = false,
  recovRecovObjImg = true,
  recovRecovObjAvtr = false,
  recovRecovObjIcnSrc = "default",
  recovRecovObjImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  recovRecovObjImgAltTxt = "__wf_reserved_inherit",
  recovRecovObjAvtrSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6679be8b25e9a8e10958d98e_avatar-default.avif",
  recovRecovObjAvtrAlt = "__wf_reserved_inherit",
  recovRecovObjTitleSrc = "ObjTitle",
  recovRecovObjSubtxt1Src = "ObjSubtxt",
  recovRecovMsgTitleSrc = "This {ObjectType} will be deleted: {Month} {Day} @ 12:01AM",
  recovRecovMsgIcnSrc = "Stop",
  recovRecovMsgBodySrc = "All access to your content will be removed forever, this action cannot be undone!",
  recovRecovDoClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "a-delete")} tag="div">
      {baseBase ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "delete-base")}
          tag="section"
          id="Delete"
        >
          <SecHead
            act1TxtSrc={baseBaseDoTxtSrc}
            act1Click={baseBaseDoClick}
            sz="xl"
            titleSrc="Please confirm"
            act1Styl="dt"
            titleSz="h4"
          />
          <ListItmCtrl
            lLAvtr={baseBaseObjAvtr}
            pPTitleSrc={baseBaseObjTitleSrc}
            pPSubtxtSrc={baseBaseObjSubtxt1Src}
            lLImg={baseBaseObjImg}
            lLImgSrc={baseBaseObjImgSrc}
            lLIcn={baseBaseObjIcn}
            lLIcnSrc={baseBaseObjIcnSrc}
            lLImgAlt={baseBaseObjImgAltTxt}
            lLAvtrSrc={baseBaseObjAvtrSrc}
            lLAvtrAlt={baseBaseObjAvtrAlt}
            lLAvtrSz="l"
            lLAdptSz="l"
            tTIcnSrc="default"
            lLIcnSz="m"
          />
          <Message
            bodySrc={baseBaseMsgBodySrc}
            titleSrc={baseBaseMsgTitleSrc}
            icnSrc={baseBaseMsgIcnSrc}
            icnClr="fd500"
          />
          <Spacer szDep="24" />
          <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
            <ButtonPanel
              btn1Click={baseBaseCancelClick}
              btn2={false}
              btn3={false}
              btn1TxtSrc="Cancel"
            />
            <Spacer />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {critCrit ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "delete-crit")}
          tag="section"
          id="Delete"
        >
          <SecHead
            act1TxtSrc={critCritDoTxtSrc}
            act1Click={critCritDoClick}
            act1Clr={critCritDoClr}
            sz="xl"
            titleSrc="Please confirm"
            act1Styl="dt"
            titleSz="h4"
          />
          <ListItmCtrl
            lLAvtr={critCritObjAvtr}
            pPTitleSrc={critCritObjTitleSrc}
            pPSubtxtSrc={critCritObjSubtxt1Src}
            lLImg={critCritObjImg}
            lLImgSrc={critCritObjImgSrc}
            lLIcn={critCritObjIcn}
            lLIcnSrc={critCritObjIcnSrc}
            lLImgAlt={critCritObjImgAltTxt}
            lLAvtrSrc={critCritObjAvtrSrc}
            lLAvtrAlt={critCritObjAvtrAlt}
            lLAvtrSz="l"
            lLAdptSz="l"
            lLIcnSz="m"
          />
          <Message
            bodySrc={critCritMsgBodySrc}
            titleSrc={critCritMsgTitleSrc}
            icnSrc={critCritMsgIcnSrc}
            icnClr="fd500"
          />
          <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
            <_Builtin.FormWrapper className={_utils.cx(_styles, "form-pass")}>
              <_Builtin.FormForm
                name="wf-form-Delete"
                data-name="Delete"
                method="get"
                id="wf-form-Delete"
              >
                <TextfieldForm
                  fieldFldBtnClick={critCritFldBtnClick}
                  fieldOnChange={critCritFldChange}
                  fieldFldClick={critCritFldClick}
                  lblTopLblSrc="Password"
                  fieldFldIcnSrc="pincode"
                  fieldFldIcn={true}
                  fieldFldIcnDisp="l"
                  fldHelp={false}
                  fieldFldBtnIcnSrc="view_pass"
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
            <ButtonPanel
              btn1Click={critCritCancelClick}
              btn2={false}
              btn3={false}
              btn1TxtSrc="Cancel"
            />
            <Spacer />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {recovRecov ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "delete-recov")}
          tag="section"
          id="Delete"
        >
          <SecHead
            act1Click={recovRecovCancelClick}
            sz="xl"
            titleSrc="Recover"
            act1TxtSrc="Cancel"
            act1Styl="dt"
            titleSz="h4"
          />
          <ListItmCtrl
            lLAvtr={recovRecovObjAvtr}
            pPTitleSrc={recovRecovObjTitleSrc}
            pPSubtxtSrc={recovRecovObjSubtxt1Src}
            lLImg={recovRecovObjImg}
            lLImgSrc={recovRecovObjImgSrc}
            lLIcn={recovRecovObjIcn}
            lLIcnSrc={recovRecovObjIcnSrc}
            lLImgAlt={recovRecovObjImgAltTxt}
            lLAvtrSrc={recovRecovObjAvtrSrc}
            lLAvtrAlt={recovRecovObjAvtrAlt}
            lLAvtrSz="l"
            lLAdptSz="l"
            lLIcnSz="m"
          />
          <Message
            bodySrc={recovRecovMsgBodySrc}
            titleSrc={recovRecovMsgTitleSrc}
            icnSrc={recovRecovMsgIcnSrc}
            icnClr="fd500"
          />
          <_Builtin.Block className={_utils.cx(_styles, "dock-btm")} tag="div">
            <Spacer szDep="24" />
            <Spacer szDep="24" />
            <ButtonPanel
              btn1Click={recovRecovDoClick}
              btn2={false}
              btn3={false}
              btn1TxtSrc="Restore"
            />
            <Spacer />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
