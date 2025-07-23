"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ItemHead } from "./ItemHead";
import { Spacer } from "./Spacer";
import { TextfieldForm } from "./TextfieldForm";
import { TextareaForm } from "./TextareaForm";
import { UploadForm } from "./UploadForm";
import { InputWBtns } from "./InputWBtns";
import * as _utils from "./utils";
import _styles from "./MPostAdd.module.css";

export function MPostAdd({
  as: _Component = _Builtin.Block,
  postType = "Post Type",
  cancelClick = {},
  itmHead = true,
  itmImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  itmImgAlt = "__wf_reserved_inherit",
  itmName = "ItemName description goes here andline wraps",
  upldUpldFldLblSrc = "Media",
  upldUpldFileDzChange,
  upldUpldFileDzClick = {},
  upldUpldBar = false,
  upldUpldBarFileMap,
  upldExampleFileUpload = true,
  upldUpldBarFileImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  upldUpldBarFileImgAlt = "__wf_reserved_inherit",
  upldUpldCapt = false,
  upldUpldBarFileTitleSrc = "TitleName",
  upldUpldBarFileClick = {},
  titleFldHelp = false,
  titleFldHelpL = true,
  titleFldHelpR = false,
  titleFldHelpLSrc = "helper copy",
  titleFldHelpRSrc = "0/50",
  titleFldChange,
  titleFldClick = {},
  bodyFldHelp = true,
  bodyFldHelpL = true,
  bodyFldHelpR = false,
  bodyFldHelpLSrc = "helper left copy",
  bodyFldHelpRSrc = "0/200",
  bodyFldChange,
  bodyFldClick = {},
  upldFld = false,
  emojiBtn = true,
  emojiBtnIcnSrc = "emj",
  emojiBtnClick = {},
  doClick = {},
  upldUpldFldHelp = false,
  upldUpldFldHelpL = true,
  upldUpldFldHelpR = false,
  upldUpldFldHelpLSrc = "Add images and video ",
  upldUpldFldHelpRSrc = "0/200",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "g-post-add")}
      tag="section"
      id="Room"
    >
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          titleSrc={postType}
          act1Click={cancelClick}
          titleSz="h4"
          sz="m"
        />
        <ItemHead
          itmHead={itmHead}
          itmImgSrc={itmImgSrc}
          name={itmName}
          itmImgAlt={itmImgAlt}
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "a-body")} tag="div">
        <Spacer />
        <_Builtin.FormWrapper>
          <_Builtin.FormForm
            name="wf-form-Post-2"
            data-name="Post"
            method="get"
            id="wf-form-Post-2"
          >
            <TextfieldForm
              fieldOnChange={titleFldChange}
              fieldFldClick={titleFldClick}
              fldHelp={titleFldHelp}
              fldHelpHelpRSrc={titleFldHelpRSrc}
              fldHelpHelpR={titleFldHelpR}
              fldHelpHelpLSrc={titleFldHelpLSrc}
              lblTopLblSrc="Title"
              fieldTabOrder="0"
              fld={true}
            />
            <TextareaForm
              fieldOnChange={bodyFldChange}
              fieldFldClick={bodyFldClick}
              fldHelp={bodyFldHelp}
              fldHelpHelpL={bodyFldHelpL}
              fldHelpHelpR={bodyFldHelpR}
              fldHelpHelpLSrc={bodyFldHelpLSrc}
              fldHelpHelpRSrc={bodyFldHelpRSrc}
              fieldFldId="Body"
              lblTopLblSrc="Body"
              fieldTabOrder="0"
              fld={true}
            />
            <UploadForm
              lblTopLblSrc={upldUpldFldLblSrc}
              fldHelpHelpLSrc={upldUpldFldHelpLSrc}
              fldHelp={upldUpldFldHelp}
              fld={upldFld}
              upldDzChange={upldUpldFileDzChange}
              upldDzClick={upldUpldFileDzClick}
              upldFileMap={upldUpldBarFileMap}
              upldExampleFile={upldExampleFileUpload}
              upldFileImgAlt={upldUpldBarFileImgAlt}
              upldFileTitleSrc={upldUpldBarFileTitleSrc}
              upldClick={upldUpldBarFileClick}
              upldFileCapt={upldUpldCapt}
              fldHelpHelpL={upldUpldFldHelpL}
              fldHelpHelpR={upldUpldFldHelpR}
              fldHelpHelpRSrc={upldUpldFldHelpRSrc}
              upldDzTxtSrc="Tap to add or drop an image or video file here"
              lblTopOptSrc="required"
            />
            <Spacer szDep="64" />
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
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "a-footer")}
        tag="div"
        bs="s"
      >
        <InputWBtns
          lLBtn={emojiBtn}
          lLBtnIcnSrc={emojiBtnIcnSrc}
          lLBtnClick={emojiBtnClick}
          tTBtnClick={doClick}
          tTBtnTxtSrc="Done"
          tTBtnTxt={true}
          tTBtnStyle="pf"
          tTBtnSz="l"
          tTBtnIcn={false}
          pPToolbar={false}
          pPFld={false}
        />
        <Spacer />
      </_Builtin.Block>
    </_Component>
  );
}
