"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Button } from "./Button";
import { SegBtnCtrl } from "./SegBtnCtrl";
import { TextfieldCtrl } from "./TextfieldCtrl";
import * as _utils from "./utils";
import _styles from "./InputWBtns.module.css";

export function InputWBtns({
  as: _Component = _Builtin.Block,
  comp = true,
  lLBtn = true,
  lLBtnTxt = false,
  lLBtnIcn = true,
  lLBtnTxtSrc = "Button",
  lLBtnIcnSrc = "scan_qr",
  lLBtnClick = {},
  pPFld = true,
  pPToolbar = false,
  pPSegBtn = false,
  fldFldLIcn = true,
  fldFldTBtn = false,
  fldFldLIcnDisp = "l",
  fldFldLIcnSrc = "Search",
  fldFldOnChange,
  fldFldPholdSrc = "Placeholder",
  segSegBtnClr,
  segSegBtn1 = true,
  segSegBtn1Icn = false,
  segSegBtn1Txt = true,
  segSegBtn1IcnSrc = "default",
  segSegBtn1TxtSrc = "All",
  segSegBtn1Act = "true",
  segSegBtn1Click = {},
  segSegBtn2 = true,
  segSegBtn2Icn = true,
  segSegBtn2Txt = false,
  segSegBtn2IcnSrc = "graphic",
  segSegBtn2TxtSrc = "Images",
  segSegBtn2Act,
  segSegBtn2Click = {},
  segSegBtn3 = true,
  segSegBtn3Icn = true,
  segSegBtn3Txt = false,
  segSegBtn3IcnSrc = "scan_qr",
  segSegBtn3TxtSrc = "Scans",
  segSegBtn3Act,
  segSegBtn3Click = {},
  segSegBtn4 = true,
  tbrTbrAdd = false,
  tbrTbrEdit = false,
  tbrTbrLike = false,
  tbrTbrChat = false,
  tbrTbrShare = false,
  tbrTbrBkmrk = false,
  tbrTbrDlt = false,
  tbrTbrAddClr = "in",
  tbrTbrEditClr = "in",
  tbrTbrLikeClr = "in",
  tbrTbrChatClr = "in",
  tbrTbrShareClr = "in",
  tbrTbrBkmrkClr = "in",
  tbrTbrDltClr = "in",
  tbrTbrAddClick = {},
  tbrTbrEditClick = {},
  tbrTbrLikeClick = {},
  tbrTbrChatClick = {},
  tbrTbrShareClick = {},
  tbrTbrBkmrkClick = {},
  tbrTbrDltClick = {},
  tTBtn = true,
  tTBtnTxt = false,
  tTBtnIcn = true,
  tTBtnTxtSrc = "Label",
  tTBtnIcnSrc = "Send",
  tTBtnStyle = "nt",
  tTBtnSz = "m",
  tTBtnPad = "y",
  tTBtnClick = {},
  lLBtnLblClr = "in",
  lLBtnStyl = "nt",
  lLBtnSz = "m",
  segSegBtn4Icn = true,
  segSegBtn4Txt = false,
  segSegBtn4IcnSrc = "bookmark",
  segSegBtn4TxtSrc = "Bookmark",
  segSegBtn4Act,
  segSegBtn4Click = {},
  segSegBtn5 = false,
  segSegBtn5Icn = true,
  segSegBtn5Txt = true,
  segSegBtn5IcnSrc = "default",
  segSegBtn5TxtSrc = "Label",
  segSegBtn5Act,
  segSegBtn5Click = {},
  fldFldAutoFocus,
  fldFldTBtnIcnSrc = "clearcirc",
  fldFldTBtnIcnAlt = "Clear",
  fldFldTBtnClick = {},

  fldFldTBtnLink = {
    href: "#",
  },

  fldFldClick = {},
}) {
  return comp ? (
    <_Component className={_utils.cx(_styles, "c-bar-input")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "bar-lead")} tag="div">
        {lLBtn ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "bar-lead-btn")}
            tag="div"
            {...lLBtnClick}
          >
            <Button
              btnIcnSrc={lLBtnIcnSrc}
              lblClr={lLBtnLblClr}
              btnSz={lLBtnSz}
              btnStyl={lLBtnStyl}
              btnTxt={lLBtnTxt}
              btnTxtSrc={lLBtnTxtSrc}
              btnIcn={lLBtnIcn}
              btnId="LBtn"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "bar-prime")} tag="div">
        {pPToolbar ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "toolbar-edit2")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "toolbar-ss")}
              tag="div"
            >
              <Button
                btnClick={tbrTbrAddClick}
                btn={tbrTbrAdd}
                lblClr={tbrTbrAddClr}
                btnStyl="nt"
                btnTxt={false}
                btnIcnSrc="Add"
                btnTxtSrc="Add"
                btnSz="l"
              />
              <Button
                btnClick={tbrTbrEditClick}
                btn={tbrTbrEdit}
                lblClr={tbrTbrEditClr}
                btnStyl="nt"
                btnTxt={false}
                btnIcnSrc="edit"
                btnTxtSrc="Edit"
                btnSz="l"
              />
              <Button
                btnClick={tbrTbrLikeClick}
                btn={tbrTbrLike}
                lblClr={tbrTbrLikeClr}
                btnStyl="nt"
                btnIcnSrc="like"
                btnTxtSrc="Like"
                btnTxt={false}
                btnSz="l"
              />
              <Button
                btnClick={tbrTbrChatClick}
                btn={tbrTbrChat}
                lblClr={tbrTbrChatClr}
                btnStyl="nt"
                btnIcnSrc="chat"
                btnTxtSrc="Chat"
                btnTxt={false}
                btnSz="l"
              />
              <Button
                btnClick={tbrTbrShareClick}
                btn={tbrTbrShare}
                lblClr={tbrTbrShareClr}
                btnStyl="nt"
                btnIcnSrc="share"
                btnTxtSrc="Share"
                btnTxt={false}
                btnSz="l"
              />
              <Button
                btnClick={tbrTbrBkmrkClick}
                btn={tbrTbrBkmrk}
                lblClr={tbrTbrBkmrkClr}
                btnStyl="nt"
                btnIcnSrc="bookmark"
                btnTxtSrc="Bookmark"
                btnTxt={false}
                btnSz="l"
              />
              <Button
                btnClick={tbrTbrDltClick}
                btn={tbrTbrDlt}
                lblClr={tbrTbrDltClr}
                btnStyl="nt"
                btnIcnSrc="delete"
                btnTxtSrc="Delete"
                btnTxt={false}
                btnSz="l"
              />
            </_Builtin.Block>
            <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A.toolbar-ss%20.btn-link%20%7B%0Awidth%3A%2064px%3B%0A%7D%0A%3C%2Fstyle%3E" />
          </_Builtin.Block>
        ) : null}
        <SegBtnCtrl
          segBtn={pPSegBtn}
          btn1Btn1Actv={segSegBtn1Act}
          btn1Btn1Click={segSegBtn1Click}
          btn2Btn2Actv={segSegBtn2Act}
          btn2Btn2Click={segSegBtn2Click}
          btn3Btn3Actv={segSegBtn3Act}
          btn3Btn3Click={segSegBtn3Click}
          btn4Btn4Actv={segSegBtn4Act}
          btn4Btn4Click={segSegBtn4Click}
          segBtnClr={segSegBtnClr}
          btn1Btn1TxtSrc={segSegBtn1TxtSrc}
          btn1Btn1Txt={segSegBtn1Txt}
          btn1Btn1Icn={segSegBtn1Icn}
          btn2Btn2Txt={segSegBtn2Txt}
          btn2Btn2TxtSrc={segSegBtn2TxtSrc}
          btn2Btn2IcnSrc={segSegBtn2IcnSrc}
          btn3Btn3Txt={segSegBtn3Txt}
          btn3Btn3TxtSrc={segSegBtn3TxtSrc}
          btn3Btn3IcnSrc={segSegBtn3IcnSrc}
          btn4={segSegBtn4}
          btn4Btn4Txt={segSegBtn4Txt}
          btn4Btn4TxtSrc={segSegBtn4TxtSrc}
          btn4Btn4IcnSrc={segSegBtn4IcnSrc}
          btn3={segSegBtn3}
          btn1={segSegBtn1}
          btn2={segSegBtn2}
          btn1Btn1IcnSrc={segSegBtn1IcnSrc}
          btn2Btn2Icn={segSegBtn2Icn}
          btn3Btn3Icn={segSegBtn3Icn}
          btn4Btn4Icn={segSegBtn4Icn}
          btn5={segSegBtn5}
          btn5Btn5Actv={segSegBtn5Act}
          btn5Btn5Icn={segSegBtn5Icn}
          btn5Btn5Txt={segSegBtn5Txt}
          btn5Btn5TxtSrc={segSegBtn5TxtSrc}
          btn5Btn5IcnSrc={segSegBtn5IcnSrc}
          btn5Btn5Click={segSegBtn5Click}
        />
        {pPFld ? (
          <_Builtin.FormWrapper className={_utils.cx(_styles, "input-field")}>
            <_Builtin.FormForm
              className={_utils.cx(_styles, "input-form")}
              name="wf-form-Search"
              data-name="Search"
              method="get"
              id="wf-form-Search"
            >
              <TextfieldCtrl
                fldBtn={fldFldTBtn}
                fldIcnSrc={fldFldLIcnSrc}
                fldIcn={fldFldLIcn}
                fldIcnDisp={fldFldLIcnDisp}
                fldClick={fldFldClick}
                onChange={fldFldOnChange}
                fldBtnClick={fldFldTBtnClick}
                fldPholdSrcX={fldFldPholdSrc}
                fldBtnIcnSrc={fldFldTBtnIcnSrc}
                fldBtnIcnAlt={fldFldTBtnIcnAlt}
                autoFocus={fldFldAutoFocus}
                fldTxt={true}
              />
            </_Builtin.FormForm>
            <_Builtin.FormSuccessMessage />
            <_Builtin.FormErrorMessage />
          </_Builtin.FormWrapper>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "bar-trail")} tag="div">
        {tTBtn ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "bar-trail-btn")}
            tag="div"
            trail-btn-pad={tTBtnPad}
            {...tTBtnClick}
          >
            <Button
              btnIcnSrc={tTBtnIcnSrc}
              btnStyl={tTBtnStyle}
              btnTxt={tTBtnTxt}
              btnTxtSrc={tTBtnTxtSrc}
              btnIcn={tTBtnIcn}
              btnSz={tTBtnSz}
              btnId="TBtn"
              btnHug=""
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  ) : null;
}
