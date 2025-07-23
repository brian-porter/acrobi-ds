"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SecHead } from "./SecHead";
import { ItemHead } from "./ItemHead";
import { Message } from "./Message";
import { SliderForm } from "./SliderForm";
import { TextfieldForm } from "./TextfieldForm";
import { TextareaForm } from "./TextareaForm";
import { Spacer } from "./Spacer";
import { UploadForm } from "./UploadForm";
import { InputWBtns } from "./InputWBtns";
import * as _utils from "./utils";
import _styles from "./MPostRevAdd.module.css";

export function MPostRevAdd({
  as: _Component = _Builtin.Block,
  cancelClick = {},
  itmHead = true,
  itmImgSrc = "https://cdn.prod.website-files.com/6466482759c1cbf5069c78d5/6466482759c1cbf5069c790c_image.svg",
  itmImgAlt = "__wf_reserved_inherit",
  itmName = "ItemName description goes here andline wraps",
  ratingMap,
  ratingValue = "0",
  hlineChange,
  hlineClick = {},
  reviewChange,
  reviewClick = {},
  mediaClick = {},
  uploadMap,
  uploadExample = true,
  mediaChange,
  emojiBtnClick = {},
  doClick = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "g-postrev-add")} tag="section">
      <_Builtin.Block className={_utils.cx(_styles, "a-header")} tag="div">
        <SecHead
          act1Click={cancelClick}
          titleSrc="Review"
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
        <_Builtin.FormWrapper>
          <_Builtin.FormForm
            name="wf-form-Post-2"
            data-name="Post"
            method="get"
            id="wf-form-Post-2"
          >
            <Message
              icn={false}
              titleSrc="How would you rate it..."
              bodySrc="From 0 being horrible, to excellent with a 100%."
              bodyClr="n700"
              lbl={true}
            />
            <SliderForm
              fieldSliderValue={ratingValue}
              lblTopLblSrc="Overall Rating"
              fldHelp={false}
            />
            <TextfieldForm
              fieldOnChange={hlineChange}
              fieldFldClick={hlineClick}
              lblTopLblSrc="Headline"
              fldHelp={true}
              fieldTabOrder="0"
              fld={true}
              fldHelpHelpR={true}
              fldHelpHelpLSrc=""
              fldHelpHelpRSrc="0/100"
            />
            <TextareaForm
              fieldOnChange={reviewChange}
              fieldFldClick={reviewClick}
              fieldFldId="Review"
              lblTopLblSrc="Review"
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
        bs="s"
      >
        <InputWBtns
          lLBtnClick={emojiBtnClick}
          tTBtnClick={doClick}
          lLBtn={true}
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
