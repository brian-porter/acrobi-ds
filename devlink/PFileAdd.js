"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ItemHead } from "./ItemHead";
import { Spacer } from "./Spacer";
import { SelectlistForm } from "./SelectlistForm";
import { TextfieldForm } from "./TextfieldForm";
import { UploadForm } from "./UploadForm";
import { InputWBtns } from "./InputWBtns";
import * as _utils from "./utils";
import _styles from "./PFileAdd.module.css";

export function PFileAdd({
  as: _Component = _Builtin.Block,
  titleSrc = "Add to ",
  cancelClick = {},
  itmHead = true,
  itmImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  itmImgAlt = "__wf_reserved_inherit",
  itmName = "ItemName description goes here andline wraps",
  typeFld = true,
  typePHoldSrc = "Select the document type",
  typePHoldClr = "n500",
  typeSelectDrpHide = false,
  typeFldMap,
  titleFld = true,
  titleFldChars = "0/50",
  titleFldChange,
  titleFldClick = {},
  upldUpldFld = true,
  upldUpldFldLblSrc = "Media",
  upldUpldFldOptSrc = "required",
  upldUpldFileDzChange,
  upldUpldFileDzClick = {},
  upldUpldBar = false,
  upldUpldBarFileMap,
  upldExampleFileUpload = true,
  upldUpldBarFileImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  upldUpldBarFileImgAlt = "__wf_reserved_inherit",
  upldUpldBarFileTitleSrc = "DocName",
  upldUpldBarFileClick = {},
  doClick = {},
  upldUpldOpt = false,
  upldUpldOptCamera = true,
  upldUpldOptLib = true,
  upldUpldOptUnsplash = false,
  upldUpldOptUrl = false,
  upldUpldOptCameraClick = {},
  upldUpldOptLibClick = {},
  upldUpldOptUnsplashClick = {},
  upldUpldOptUrlClick = {},
  upldUpldUrl = false,
  upldUpldUrlFldChange,
  upldUpldUrlFldClick = {},
  upldUpldUrlBtnGetClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "g-lib-add")} tag="section">
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          titleSrc={titleSrc}
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
      <_Builtin.Block className={_utils.cx(_styles, "a-body-file")} tag="div">
        <Spacer size="16" />
        <_Builtin.FormWrapper className={_utils.cx(_styles, "form-block")}>
          <_Builtin.FormForm
            name="wf-form-Post-2"
            data-name="Post"
            method="get"
            id="wf-form-Post-2"
          >
            <SelectlistForm
              fieldSelectMap={typeFldMap}
              fld={typeFld}
              fieldPHoldSrc={typePHoldSrc}
              fieldPHoldClr={typePHoldClr}
              fieldSelectDrpHide={typeSelectDrpHide}
              fldHelp={false}
              lblTopLblSrc="Type"
              fieldFldId="type"
            />
            <TextfieldForm
              fieldOnChange={titleFldChange}
              fieldFldClick={titleFldClick}
              fldHelpHelpRSrc={titleFldChars}
              fld={titleFld}
              lblTopLblSrc="Title"
              fldHelp={true}
              fieldTabOrder="0"
              fldHelpHelpR={true}
              fldHelpHelpLSrc="What properly describes this document"
              lblTopOpt={true}
              lblTopOptSrc="required"
            />
            <UploadForm
              fld={upldUpldFld}
              lblTopLblSrc={upldUpldFldLblSrc}
              upldDzClick={upldUpldFileDzClick}
              upldFileMap={upldUpldBarFileMap}
              upldExampleFile={upldExampleFileUpload}
              upldDzChange={upldUpldFileDzChange}
              lblTopOptSrc={upldUpldFldOptSrc}
              upldFileImgAlt={upldUpldBarFileImgAlt}
              upldFileTitleSrc={upldUpldBarFileTitleSrc}
              upldClick={upldUpldBarFileClick}
              upldOpt={upldUpldOpt}
              upldOptCamera={upldUpldOptCamera}
              upldOptLib={upldUpldOptLib}
              upldOptUnsplash={upldUpldOptUnsplash}
              upldOptUrl={upldUpldOptUrl}
              upldOptCameraClick={upldUpldOptCameraClick}
              upldOptLibClick={upldUpldOptLibClick}
              upldOptUnsplashClick={upldUpldOptUnsplashClick}
              upldOptUrlClick={upldUpldOptUrlClick}
              upldUrlModal={upldUpldUrl}
              upldUrlFldChange={upldUpldUrlFldChange}
              upldUrlGetClick={upldUpldUrlBtnGetClick}
              upldUrlFldClick={upldUpldUrlFldClick}
              lblTopOpt={false}
              fldHelp={false}
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
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "a-footer")}
        tag="div"
        data-bs="s"
      >
        <InputWBtns
          tTBtnClick={doClick}
          lLBtn={false}
          tTBtnTxtSrc="Done"
          tTBtnTxt={true}
          tTBtnStyle="pf"
          tTBtnSz="l"
          tTBtnIcn={false}
          lLBtnIcnSrc="emj"
          pPToolbar={false}
          lLBtnClick={{}}
          pPFld={false}
        />
        <Spacer />
      </_Builtin.Block>
    </_Component>
  );
}
