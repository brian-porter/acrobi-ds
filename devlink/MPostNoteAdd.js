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
import _styles from "./MPostNoteAdd.module.css";

export function MPostNoteAdd({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  itmHead = true,
  itmImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  itmImgAlt = "__wf_reserved_inherit",
  itmName = "ItemName description goes here andline wraps",
  titleChange,
  titleClick = {},
  bodyChange,
  bodyClick = {},
  mediaChange,
  mediaClick = {},
  uploadMap,
  uploadExample = true,
  emojiBtnClick = {},
  doClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "g-postnote-add")} tag="section">
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead act1Click={cancelClick} titleSrc="Note" titleSz="h4" sz="m" />
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
              fieldOnChange={titleChange}
              fieldFldClick={titleClick}
              lblTopLblSrc="Title"
              fldHelp={false}
              fieldTabOrder="0"
              fld={true}
            />
            <TextareaForm
              fieldOnChange={bodyChange}
              fieldFldClick={bodyClick}
              fieldFldId="Body"
              lblTopLblSrc="Body"
              fldHelp={false}
              fieldTabOrder="0"
              fld={true}
            />
            <Spacer />
            <UploadForm
              upldDzClick={mediaClick}
              upldFileMap={uploadMap}
              upldExampleFile={uploadExample}
              upldDzChange={mediaChange}
              fldHelp={false}
              lblTopLblSrc="Media"
              fld={true}
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
        data-bs="s"
      >
        <InputWBtns
          lLBtnClick={emojiBtnClick}
          tTBtnClick={doClick}
          lLBtn={false}
          tTBtnTxtSrc="Done"
          tTBtnTxt={true}
          tTBtnStyle="pf"
          tTBtnSz="l"
          tTBtnIcn={false}
          lLBtnIcnSrc="emj"
          pPToolbar={false}
          pPFld={false}
        />
        <Spacer />
      </_Builtin.Block>
    </_Component>
  );
}
